const { v4: uuidv4 } = require('uuid');
const vision = require('@google-cloud/vision').v1;
const textToSpeech = require('@google-cloud/text-to-speech');
const { Storage } = require('@google-cloud/storage');
const { prisma } = require('../conf/db');
const path = require('path');
const { uploadFilesToGCS, uploadToGCS, uploadCoverToGCS } = require('./uploadController');


// Configuración de los clientes de Google Cloud
const visionClient = new vision.ImageAnnotatorClient();
const ttsClient = new textToSpeech.TextToSpeechClient();
const storage = new Storage();

const credentialsPath = path.join(__dirname, './google-key.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;
const bucketName = 'sportify-2';
const audioFolder = 'uploads/audio';
const outputFolder = 'uploads/json';
const DEFAULT_BITRATE = 64000; 

// Función para extraer texto de un PDF usando Vision API
async function extractTextFromPDF(pdfGcsUrl) {
  // Generar un ID único para esta ejecución
  const uniqueId = uuidv4();
  const uniqueOutputFolder = `${outputFolder}/${uniqueId}`;

  const request = {
    requests: [
      {
        inputConfig: {
          gcsSource: { uri: pdfGcsUrl },
          mimeType: 'application/pdf',
        },
        features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
        outputConfig: {
          gcsDestination: {
            uri: `gs://${bucketName}/${uniqueOutputFolder}/`,
          },
          batchSize: 8, // Ajusta el tamaño según sea necesario
        },
      },
    ],
  };

  // Ejecutar la operación
  const [operation] = await visionClient.asyncBatchAnnotateFiles(request);
  await operation.promise();

  console.log('Extrayendo texto del PDF...');

  // Obtener solo los JSON generados en esta ejecución
  const [files] = await storage.bucket(bucketName).getFiles({ prefix: uniqueOutputFolder });
  const jsonFiles = files.filter(file => file.name.endsWith('.json'));

  if (jsonFiles.length === 0) {
    throw new Error('No se encontraron archivos JSON generados por Vision API.');
  }

  let extractedText = '';

  for (const file of jsonFiles) {
    const [content] = await file.download();
    const jsonResponse = JSON.parse(content.toString());

    if (jsonResponse.responses && jsonResponse.responses[0].fullTextAnnotation) {
      extractedText += jsonResponse.responses[0].fullTextAnnotation.text + '\n';
    }
  }

  console.log('Texto extraído del PDF:', extractedText);

  return { extractedText };
}
// Función para convertir texto a voz y guardar el archivo de audio en GCS
async function convertirTextoAVoz(texto, title) {
  const request = {
    input: { text: texto },
    voice: {
      languageCode: 'es-ES',
      ssmlGender: 'NEUTRAL',
    },
    audioConfig: {
      audioEncoding: 'MP3',
    },
  };

  const [response] = await ttsClient.synthesizeSpeech(request);
  const audioFileName = `${title}-audio.mp3`;
  const file = storage.bucket(bucketName).file(`${audioFolder}/${audioFileName}`);

  await file.save(response.audioContent, {
    contentType: 'audio/mp3',
    resumable: false,
  });
  console.log(`Audio subido a GCS en la ruta: gs://${bucketName}/${audioFolder}/${audioFileName}`);

  // Obtener el tamaño del archivo para estimar la duración
  const [metadata] = await file.getMetadata();
  const fileSizeInBytes = metadata.size;
  const durationInSeconds = (fileSizeInBytes * 8) / DEFAULT_BITRATE;
  const durationInMinutes = Math.round((durationInSeconds / 60) * 10) / 10; // Redondea a 2 decimales


  // Generar la URL HTTP del archivo de audio
  const audioUrl = `https://storage.googleapis.com/${bucketName}/${audioFolder}/${audioFileName}`;

  return {audioUrl, audioDuration:durationInMinutes};
}

// Función principal para crear un audiolibro a partir de URLs
const createAudiobook = async (req, res) => {
  try {
    const { title, categoryId, description, author, pdfUrl, coverUrl } = req.body;

    // Validación de campos obligatorios
    if (!title || !pdfUrl || !coverUrl) {
      return res.status(400).json({ error: "Faltan el título, PDF URL o la URL de la portada." });
    }

    // Validación de unicidad para los campos antes de la inserción
    const existingAudiobook = await prisma.audiobook.findFirst({
      where: {
        OR: [
          { title: title },
          { pdfUrl: pdfUrl },
          { coverUrl: coverUrl }
        ]
      }
    });

    if (existingAudiobook) {
      return res.status(409).json({ error: "Ya existe un audiolibro con el mismo título, PDF URL o URL de portada." });
    }

    const { extractedText } = await extractTextFromPDF(pdfUrl);
    const [titleLine, ...contentLines] = extractedText.split('\n');
    const contentText = contentLines.join('\n');

    // Convertir el texto a voz y obtener URL y duración
    const { audioUrl, audioDuration } = await convertirTextoAVoz(contentText, title);
    // Guardar información en la base de datos
    const newAudiobook = await prisma.audiobook.create({
      data: {
        title,
        categoryId: parseInt(categoryId),
        description,
        author,
        pdfUrl,
        coverUrl,
        duration: `${audioDuration} min`,
        audioUrl,
        text: extractedText,  // Guarda el texto completo, incluido el título
      },
    });

    res.status(201).json(newAudiobook);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: "Ya existe un audiolibro con un valor único duplicado en la base de datos." });
    }

    console.error('Error creando audiolibro:', error);
    res.status(500).json({ error: 'Error creando audiolibro', details: error.message });
  }
};
// Eliminar un libro
const deleteAudioBook = async (req, res) => {
  const { id } = req.params;

  try {
    const Audiobook = await prisma.audiobook.findUnique({
      where: { id: Number(id) },
    });
    if (!Audiobook) {
      return res.status(404).json({ error: 'Audiobook not found' });
    }

    await prisma.audiobook.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting Audiobook:', error);
    res.status(500).json({ error: 'Error deleting Audiobook', details: error.message });
  }
};

// Obtener todos los audiolibros
const getAudiobooks = async (req, res) => {
  try {
    const audiobooks = await prisma.audiobook.findMany();
    res.status(200).json(audiobooks);
  } catch (error) {
    console.error('Error fetching audiobooks:', error);
    res.status(500).json({ error: 'Error fetching audiobooks', details: error.message });
  }
};

const getAudioBookById = async (req, res) => {
  const { id } = req.params;

  try {
    // Convierte el id a un número entero
    const audiobookId = parseInt(id, 10);

    // Verifica que la conversión fue exitosa
    if (isNaN(audiobookId)) {
      return res.status(400).json({ error: "El id proporcionado no es válido." });
    }

    const audiobook = await prisma.audiobook.findUnique({
      where: {
        id: audiobookId, // Usa el id convertido
      },
    });

    if (!audiobook) {
      return res.status(404).json({ error: "Audiobook no encontrado." });
    }

    res.json(audiobook);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const getAudiobooksByCategory = async (req, res) => {
  const { categoryId } = req.params;

  // Convertimos el categoryId a número
  const categoryIdNumber = Number(categoryId);
  
  if (isNaN(categoryIdNumber)) {
    return res.status(400).json({ error: 'Invalid categoryId' });
  }

  try {
    // Realizamos la consulta con categoryId directamente
    const audiobooks = await prisma.audiobook.findMany({
      where: {
        categoryId: categoryIdNumber, // Pasamos el valor directamente
      },
    });

    res.status(200).json(audiobooks);
  } catch (error) {
    console.error('Error fetching audiobooks by category:', error);
    res.status(500).json({ error: 'Error fetching audiobooks by category', details: error.message });
  }
};

const updateAudiobook = async (req, res) => {
  const { id } = req.params;
  const { title, categoryId, description, author, pdfUrl, coverUrl } = req.body;

  let newPdfUrl = pdfUrl;
  let newAudioUrl = null;
  let newCoverUrl = coverUrl;
  let newText = null;
  let newDuration = null;

  try {
    // Buscar el audiolibro existente
    const audiobook = await prisma.audiobook.findUnique({
      where: { id: parseInt(id) },
    });

    if (!audiobook) {
      return res.status(404).json({ error: "Audiobook not found" });
    }

    // Verificar si hay un nuevo archivo PDF
    if (req.files?.pdfFile) {
      // Subir el nuevo PDF a GCS
      newPdfUrl = await uploadToGCS(
        req.files.pdfFile[0].buffer,
        req.files.pdfFile[0].originalname,
        "uploads/pdf"
      );
      console.log("Nuevo PDF URL generado:", newPdfUrl);

      // Extraer texto del PDF
      const { extractedText } = await extractTextFromPDF(newPdfUrl);
      console.log("Texto extraído correctamente");

      // Generar audio a partir del texto
      const { audioUrl, audioDuration } = await convertirTextoAVoz(extractedText, title || audiobook.title);
      console.log("Audio generado correctamente:", audioUrl);

      // Asignar nuevos valores
      newAudioUrl = audioUrl;
      newText = extractedText;
      newDuration = audioDuration;
    }

    // Verificar si hay una nueva portada
    if (req.files?.coverFile) {
      newCoverUrl = await uploadCoverToGCS(
        req.files.coverFile[0].buffer,
        req.files.coverFile[0].originalname
      );
    }

    // Construir datos de actualización solo si hay cambios
    const updateData = {};

    if (title && title !== audiobook.title) updateData.title = title;
    if (categoryId && parseInt(categoryId) !== audiobook.categoryId) updateData.categoryId = parseInt(categoryId);
    if (description && description !== audiobook.description) updateData.description = description;
    if (author && author !== audiobook.author) updateData.author = author;

    // Solo actualizar si el PDF ha cambiado
    if (newPdfUrl && newPdfUrl !== audiobook.pdfUrl) {
      updateData.pdfUrl = newPdfUrl;
      updateData.text = newText;  // Actualizar el texto extraído
      updateData.duration = `${newDuration} min`;  // Actualizar la duración
    }

    // Solo actualizar si la portada ha cambiado
    if (newCoverUrl && newCoverUrl !== audiobook.coverUrl) updateData.coverUrl = newCoverUrl;

    // Solo actualizar si el audio ha cambiado
    if (newAudioUrl) updateData.audioUrl = newAudioUrl;

    // Si no hay cambios en los datos
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No changes detected to update." });
    }

    // Actualizar el audiolibro en la base de datos
    const updatedAudiobook = await prisma.audiobook.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.status(200).json(updatedAudiobook);
  } catch (error) {
    console.error("Error updating Audiobook:", error);
    res.status(500).json({ error: "Error updating Audiobook", details: error.message });
  }
};

module.exports = {
  createAudiobook,
  deleteAudioBook,
  getAudioBookById,
  updateAudiobook,
  getAudiobooks,
  getAudiobooksByCategory,
};

