const { prisma } = require('../conf/db');

// Añadir un libro a la biblioteca del usuario (como favorito o reproducido)
const addBookToLibraryCategory = async (req, res) => {
    const { firebaseUserId, audiobookId, category } = req.body;

    if (!firebaseUserId || !audiobookId || !category) {
      return res.status(400).json({ message: "firebaseUserId, audiobookId y category son obligatorios." });
    }

    try {
        // Buscar al usuario en la base de datos usando el firebaseUserId
        const user = await prisma.user.findUnique({
            where: { id: firebaseUserId },
        });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Verificar si el audiolibro existe
        const audiobook = await prisma.audiobook.findUnique({
            where: { id: audiobookId },
        });

        if (!audiobook) {
            return res.status(404).json({ message: "Audiolibro no encontrado." });
        }

        // Buscar si el audiolibro ya existe en la biblioteca del usuario
        const existingEntry = await prisma.library.findFirst({
            where: {
                userId: firebaseUserId,
                audiobookId,
            },
        });

        if (existingEntry) {
            // Si ya existe, solo actualizamos el campo correspondiente
            const updatedEntry = await prisma.library.update({
                where: { id: existingEntry.id },
                data: {
                    // Solo actualizar el nuevo campo de la categoría, si no está ya en true
                    [category]: true,
                },
            });
            res.status(200).json(updatedEntry);
        } else {
            // Si no existe, crear la nueva entrada con la categoría marcada como true
            const libraryEntry = await prisma.library.create({
                data: {
                    userId: firebaseUserId,
                    audiobookId,
                    // Mantener el estado anterior de otros campos y solo marcar la nueva categoría
                    saved: existingEntry?.saved || false,
                    favorite: existingEntry?.favorite || false,
                    played: existingEntry?.played || false,
                    finished: existingEntry?.finished || false,
                    [category]: true, // Solo marcar la categoría en true
                },
            });
            res.status(200).json(libraryEntry);
        }
    } catch (error) {
        console.error("Error al añadir el libro a la categoría:", error);
        res.status(500).json({ message: "Error al añadir el libro a la categoría." });
    }
};


// Obtener los libros favoritos o reproducidos de un usuario
const getUserLibraryCategory = async (req, res) => {
    const { userId, category } = req.params;

    if (!userId || !category) {
      return res.status(400).json({ message: "userId y category son obligatorios." });
    }

    try {
        // Obtener todos los libros de la biblioteca del usuario filtrados por la categoría
        const libraryEntries = await prisma.library.findMany({
            where: {
                userId: userId,
                [category]: true, // Filtrar por la categoría que se pasa en el parámetro
            },
            include: { audiobook: true },
        });

        res.status(200).json({
            [category]: {
                audiobooks: libraryEntries.map(entry => entry.audiobook),
                count: libraryEntries.length,
            }
        });
    } catch (error) {
        console.error('Error fetching user library category:', error);
        res.status(500).json({ error: 'Error fetching user library category', details: error.message });
    }
};

const fetchLibraryState = async (req, res) => {
    const { userId } = req.params;
  
    if (!userId) {
      return res.status(400).json({ message: "userId es obligatorio." });
    }
  
    try {
      // Consultar todos los libros de la biblioteca del usuario
      const libraryEntries = await prisma.library.findMany({
        where: { userId },
        include: { audiobook: true }, // Incluir detalles de los audiolibros
      });
  
      // Agrupar los libros por categoría
      const libraryState = {
        saved: [],
        favorite: [],
        played: [],
        finished: [],
      };
  
      libraryEntries.forEach((entry) => {
        if (entry.saved) libraryState.saved.push(entry.audiobook.id);
        if (entry.favorite) libraryState.favorite.push(entry.audiobook.id);
        if (entry.played) libraryState.played.push(entry.audiobook.id);
        if (entry.finished) libraryState.finished.push(entry.audiobook.id);
      });
  
      res.status(200).json(libraryState);
    } catch (error) {
      console.error("Error al obtener el estado de la biblioteca:", error);
      res.status(500).json({ message: "Error al obtener el estado de la biblioteca." });
    }
  };
  

// Eliminar un libro de la biblioteca del usuario
const removeBookFromLibraryCategory = async (req, res) => {
    const { firebaseUserId, audiobookId, category } = req.params;

    if (!firebaseUserId || !audiobookId || !category) {
      return res.status(400).json({ message: "firebaseUserId, audiobookId y category son obligatorios." });
    }

    try {
        // Buscar la entrada en la biblioteca
        const libraryEntry = await prisma.library.findFirst({
            where: {
                userId: firebaseUserId,
                audiobookId: Number(audiobookId),
            },
        });

        if (!libraryEntry) {
            return res.status(404).json({ error: 'Libro no encontrado en la biblioteca del usuario' });
        }

        // Desmarcar el campo correspondiente (por ejemplo, si la categoría es "favorite", se desmarca "favorite")
        const updateData = {
            saved: libraryEntry.saved,
            favorite: libraryEntry.favorite,
            played: libraryEntry.played,
            finished: libraryEntry.finished,
        };

        updateData[category] = false;

        // Actualizar la entrada en la biblioteca
        const updatedEntry = await prisma.library.update({
            where: { id: libraryEntry.id },
            data: updateData,
        });

        // Si todos los campos están desmarcados, eliminar la entrada
        if (!updatedEntry.saved && !updatedEntry.favorite && !updatedEntry.played && !updatedEntry.finished) {
            await prisma.library.delete({
                where: { id: updatedEntry.id },
            });
            return res.status(204).send(); // No content response
        }

        res.status(200).json(updatedEntry);
    } catch (error) {
        console.error('Error al eliminar el libro de la categoría:', error);
        res.status(500).json({ error: 'Error al eliminar el libro de la categoría', details: error.message });
    }
};



module.exports = {
    addBookToLibraryCategory,
    getUserLibraryCategory,
    fetchLibraryState,
    removeBookFromLibraryCategory,
};
