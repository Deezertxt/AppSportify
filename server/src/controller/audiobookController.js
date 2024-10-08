const { prisma } = require('../conf/db');

// Crear un nuevo libro
const createAudiobook = async (req, res) => {
  const { title, categoryId, description, author } = req.body;

  try {
    const newAudiobook = await prisma.audiobook.create({
      data: {
        title,
        categoryId,
        description,
        author,
      },
    });

    res.status(201).json(newAudiobook);
  } catch (error) {
    console.error('Error creating Audiobook:', error);
    res.status(500).json({ error: 'Error creating book', details: error.message });
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

// Obtener un libro por su ID
const getAudioBookById = async (req, res) => {
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

// Actualizar un libro
const updateAudiobook = async (req, res) => {
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

module.exports = {
  createAudiobook,
  deleteAudioBook,
  getAudioBookById,
  updateAudiobook,
};
