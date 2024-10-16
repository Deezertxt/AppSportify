const { prisma } = require('../conf/db');


const axios = require('axios');
const pdf = require('pdf-parse');

const extractTextFromPDF = async (pdfUrl) => {
  try {
    // Asegúrate de que la URL comience con 'http' o 'https'
    if (!/^https?:\/\//.test(pdfUrl)) {
      throw new Error('Invalid URL');
    }

    // Hacer una solicitud GET para descargar el PDF
    const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });

    // Usar pdf-parse para extraer el texto del buffer del PDF
    const data = await pdf(response.data);
    return data.text; // Devolver solo el texto extraído
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

// Crear un nuevo libro
const createAudiobook = async (req, res) => {
  const { title, categoryId, description, author, pdfUrl, coverUrl } = req.body;

  try {
    const text = await extractTextFromPDF(pdfUrl);
    // Crear el nuevo audiolibro en la base de datos
    const newAudiobook = await prisma.audiobook.create({
      data: {
        title,
        categoryId: parseInt(categoryId), // Asegurarse de que el valor sea un entero
        description,
        author,
        pdfUrl,     // Agregar URL del archivo PDF
        coverUrl,   // Agregar URL de la portada
        text, // Agregar el texto extraído del PDF
      },
    });

    // Responder con éxito
    res.status(201).json(newAudiobook);
  } catch (error) {
    console.error('Error creating Audiobook:', error);
    res.status(500).json({ error: 'Error creating audiobook', details: error.message });
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

