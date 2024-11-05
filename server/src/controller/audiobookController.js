const vision = require('@google-cloud/vision').v1;
const textToSpeech = require('@google-cloud/text-to-speech');
const { Storage } = require('@google-cloud/storage');
const { prisma } = require('../conf/db');
const path = require('path');


// Configuración de los clientes de Google Cloud
const visionClient = new vision.ImageAnnotatorClient();
const ttsClient = new textToSpeech.TextToSpeechClient();
const storage = new Storage();

const credentialsPath = path.join(__dirname, './google-key.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;
const bucketName = 'sportify-2';
const audioFolder = 'uploads/audio';
const outputFolder = 'uploads/json';

// Función para extraer texto de un PDF usando Vision API
async function extractTextFromPDF(pdfGcsUrl) {
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
            uri: `gs://${bucketName}/${outputFolder}/`,
          },
          batchSize: 8, // Adjust the batch size as needed
        },
      },
    ],
  };

  const [operation] = await visionClient.asyncBatchAnnotateFiles(request);
  await operation.promise();

  console.log('Extrayendo texto del PDF...');

  // Retrieve all JSON files from the output folder in GCS
  const [files] = await storage.bucket(bucketName).getFiles({ prefix: outputFolder });
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

  return { extractedText }; // Retorna todo el texto
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

  const audioDuration = response.audioContent.length / 16000;
  const audioFileName = `${title}-audio.mp3`;
  const file = storage.bucket(bucketName).file(`${audioFolder}/${audioFileName}`);

  await file.save(response.audioContent, {
    contentType: 'audio/mp3',
    resumable: false,
  });
  console.log(`Audio subido a GCS en la ruta: gs://${bucketName}/${audioFolder}/${audioFileName}`);
  // Generar la URL HTTP del archivo de audio
  const audioUrl = `https://storage.googleapis.com/${bucketName}/${audioFolder}/${audioFileName}`;

  return {audioUrl, audioDuration};
}
const convertDurationToMinutes = (durationInSeconds) => {
  const minutes = Math.ceil(durationInSeconds / 60);
  return `${minutes} min`;
};

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
    const durationInMinutes = convertDurationToMinutes(audioDuration);
    // Guardar información en la base de datos
    const newAudiobook = await prisma.audiobook.create({
      data: {
        title,
        categoryId: parseInt(categoryId),
        description,
        author,
        pdfUrl,
        coverUrl,
        duration: durationInMinutes,
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
    const audiobooks = await prisma.audiobook.findMany(); // Obtiene todos los registros de audiolibros
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


const updateAudiobook = async (req, res) => {
  const { id } = req.params;
  const { title, categoryId, description, author, pdfUrl, coverUrl } = req.body;
  let newPdfUrl = pdfUrl;
  let newAudioUrl = null;

  try {
    // Buscar el audiolibro existente
    const audiobook = await prisma.audiobook.findUnique({
      where: { id: parseInt(id) },
    });
    if (!audiobook) {
      return res.status(404).json({ error: 'Audiobook not found' });
    }

    // Verificar si hay un nuevo archivo PDF
    if (req.files?.pdfFile) {
      // Subir el nuevo archivo PDF y obtener la URL
      newPdfUrl = await uploadFile(req.files.pdfFile);

      // Extraer texto y generar audio
      const extractedText = await extractTxtFromPdf(newPdfUrl);
      newAudioUrl = await textToSpeech(extractedText);
    }

    // Verificar si hay una nueva portada
    let newCoverUrl = coverUrl;
    if (req.files?.coverFile) {
      newCoverUrl = await uploadFile(req.files.coverFile);
    }

    // Actualizar el audiolibro solo con los cambios
    const updatedAudiobook = await prisma.audiobook.update({
      where: { id: parseInt(id) },
      data: {
        title,
        categoryId,
        description,
        author,
        pdfUrl: newPdfUrl,
        coverUrl: newCoverUrl,
        audioUrl: newAudioUrl || audiobook.audioUrl, // Solo actualizar si hay un nuevo audio
      },
    });

    res.status(200).json(updatedAudiobook);
  } catch (error) {
    console.error('Error updating Audiobook:', error);
    res.status(500).json({ error: 'Error updating Audiobook', details: error.message });
  }
};

module.exports = {
  createAudiobook,
  deleteAudioBook,
  getAudioBookById,
  updateAudiobook,
  getAudiobooks,
};

