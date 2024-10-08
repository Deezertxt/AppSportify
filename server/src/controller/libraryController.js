const { prisma } = require('../conf/db');

// Añadir un libro a la biblioteca del usuario (como favorito o reproducido)
const addBookToLibrary = async (req, res) => {
    const { userId, audiobookId, favorite, played } = req.body;

    try {
        const libraryEntry = await prisma.library.create({
            data: {
                userId: Number(userId),
                audiobookId: Number(audiobookId),
                favorite: favorite || false, // Si no se especifica, por defecto no es favorito
                played: played || false // Si no se especifica, por defecto no ha sido reproducido
            },
        });

        res.status(201).json(libraryEntry);
    } catch (error) {
        console.error('Error adding book to library:', error);
        res.status(500).json({ error: 'Error adding book to library', details: error.message });
    }
};

// Obtener los libros favoritos o reproducidos de un usuario
const getUserLibrary = async (req, res) => {
    const { userId } = req.params;

    try {
        const libraryEntries = await prisma.library.findMany({
            where: { userId: Number(userId) },
            include: {
                audiobook: true, // Incluir la información completa del audiolibro
            },
        });

        res.status(200).json(libraryEntries);
    } catch (error) {
        console.error('Error fetching user library:', error);
        res.status(500).json({ error: 'Error fetching user library', details: error.message });
    }
};

// Eliminar un libro de la biblioteca del usuario
const removeBookFromLibrary = async (req, res) => {
    const { userId, audiobookId } = req.params;

    try {
        const libraryEntry = await prisma.library.findFirst({
            where: {
                userId: Number(userId),
                audiobookId: Number(audiobookId),
            },
        });

        if (!libraryEntry) {
            return res.status(404).json({ error: 'Book not found in user library' });
        }

        await prisma.library.delete({
            where: {
                id: libraryEntry.id,
            },
        });

        res.status(204).send(); // No content response
    } catch (error) {
        console.error('Error removing book from library:', error);
        res.status(500).json({ error: 'Error removing book from library', details: error.message });
    }
};

module.exports = {
    addBookToLibrary,
    getUserLibrary,
    removeBookFromLibrary,
};
