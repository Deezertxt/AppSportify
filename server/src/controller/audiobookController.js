const vision = require('@google-cloud/vision').v1;
const textToSpeech = require('@google-cloud/text-to-speech');
const { Storage } = require('@google-cloud/storage');
const { prisma } = require('../conf/db');
const path = require('path');

// Configuración de los clientes de Google Cloud
const visionClient = new vision.ImageAnnotatorClient();
const ttsClient = new textToSpeech.TextToSpeechClient();
const storage = new Storage();

// Configuración de credenciales y bucket de GCS
const credentialsPath = path.join(__dirname, './google-key.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;
const bucketName = 'sportify-1';
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
            uri: `gs://${bucketName}/${outputFolder}`,
          },
          batchSize: 2,
        },
      },
    ],
  };

  const [operation] = await visionClient.asyncBatchAnnotateFiles(request);
  await operation.promise();

  console.log('Extrayendo texto del PDF...');

  // Obtener el archivo JSON generado por Vision API en el folder de salida
  const [files] = await storage.bucket(bucketName).getFiles({ prefix: outputFolder });
  const outputFile = files.find(file => file.name.endsWith('.json'));

  if (!outputFile) {
    throw new Error('No se encontró el archivo JSON generado por Vision API.');
  }

  const [content] = await outputFile.download();
  const jsonResponse = JSON.parse(content.toString());

  let extractedText = '';
  if (jsonResponse.responses && jsonResponse.responses[0].fullTextAnnotation) {
    extractedText = jsonResponse.responses[0].fullTextAnnotation.text;
  }

  console.log('Texto extraído:', extractedText);
  // Generar la URL HTTP del archivo JSON
  const jsonUrl = `https://storage.googleapis.com/${bucketName}/${outputFile.name}`;

  return { extractedText, jsonUrl };
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
   // Generar la URL HTTP del archivo de audio
   const audioUrl = `https://storage.googleapis.com/${bucketName}/${audioFolder}/${audioFileName}`;

   return audioUrl;
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

    // Extraer texto del PDF y convertirlo a audio
    const { extractedText, jsonUrl } = await extractTextFromPDF(pdfUrl);
    const audioGcsUrl = await convertirTextoAVoz(extractedText, title);

    // Guardar toda la información en la base de datos
    const newAudiobook = await prisma.audiobook.create({
      data: {
        title,
        categoryId: parseInt(categoryId),
        description,
        author,
        pdfUrl,
        coverUrl,
        audioUrl: audioGcsUrl,
        jsonUrl: jsonUrl
      },
    });

    res.status(201).json(newAudiobook);
  } catch (error) {
    // Captura el error de unicidad de Prisma
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


// Actualizar un libro
const updateAudiobook = async (req, res) => {
  const { id } = req.params;
  const { title, categoryId, description, author, pdfUrl, coverUrl } = req.body;

  try {
    const audiobook = await prisma.audiobook.findUnique({
      where: { id: parseInt(id) },
    });
    if (!audiobook) {
      return res.status(404).json({ error: 'Audiobook not found' });
    }

    const updatedAudioBook = await prisma.audiobook.update({
      where: { id: parseInt(id) },
      data: {
        title,
        categoryId,
        description,
        author,
        pdfUrl,     // Agregar la URL del archivo PDF
        coverUrl,   // Agregar la URL de la portada
      },
    });

    res.status(200).json(updatedAudioBook);
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

