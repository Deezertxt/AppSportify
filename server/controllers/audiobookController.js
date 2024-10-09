import prisma from '../config/db.js';
import path from 'path';

// Crear un nuevo audiolibro con portada y PDF
export const createAudiobook = async (req, res) => {
  console.log('entro a la consulta')
  const { title, categoryId, description, author } = req.body;
  let coverImage = null;
  let pdfFile = null;

  // Verificar si se subieron los archivos
  if (req.files) {
    // Obtener la portada si fue subida
    if (req.files['coverImage']) {
      coverImage = `/uploads/${req.files['coverImage'][0].filename}`;  // Ruta de la portada
    }

    // Obtener el PDF si fue subido
    if (req.files['pdfFile']) {
      pdfFile = `/uploads/${req.files['pdfFile'][0].filename}`;  // Ruta del archivo PDF
    }
  }

  try {
    const newAudiobook = await prisma.audiobook.create({
      data: {
        title,
        categoryId: parseInt(categoryId, 10),  // Asegúrate de que `categoryId` sea un número
        description,
        author,
        coverImage,  // Guardar la ruta de la portada en la base de datos
        pdfFile,     // Guardar la ruta del archivo PDF en la base de datos
      },
    });

    res.status(201).json(newAudiobook);
  } catch (error) {
    console.error('Error creating Audiobook:', error);
    res.status(500).json({ error: 'Error creating audiobook', details: error.message });
  }
};

// Eliminar un audiolibro
export const deleteAudioBook = async (req, res) => {
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

// Obtener un audiolibro por su ID
export const getAudioBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const Audiobook = await prisma.audiobook.findUnique({
      where: { id: Number(id) },
    });
    if (!Audiobook) {
      return res.status(404).json({ error: 'Audiobook not found' });
    }
    res.status(200).json(Audiobook);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Error fetching book', details: error.message });
  }
};

// Actualizar un audiolibro
export const updateAudiobook = async (req, res) => {
  const { id } = req.params;
  const { title, categoryId, description, author } = req.body;

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
      },
    });

    res.status(200).json(updatedAudioBook);
  } catch (error) {
    console.error('Error updating Audiobook:', error);
    res.status(500).json({ error: 'Error updating Audiobook', details: error.message });
  }
};
