const { prisma } = require('../conf/db');

// Añadir un libro a la biblioteca del usuario (como favorito o reproducido)
const addBookToLibraryCategory = async (req, res) => {
    const { userId, audiobookId, category } = req.body; // Ahora recibe userId del frontend

    if (!userId || !audiobookId || !category) {
        return res.status(400).json({ message: "userId, audiobookId y category son obligatorios." });
    }

    try {
        // Verificar si el usuario existe
        const userExists = await prisma.user.findUnique({
            where: { id: userId }, // Cambiado a userId
        });

        if (!userExists) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Verificar si el audiolibro existe
        const audiobookExists = await prisma.audiobook.findUnique({
            where: { id: audiobookId },
        });

        if (!audiobookExists) {
            return res.status(404).json({ message: "Audiolibro no encontrado." });
        }

        // Buscar si ya existe una entrada para este audiolibro en la biblioteca del usuario
        const existingEntry = await prisma.library.findFirst({
            where: { userId, audiobookId }, // Cambiado a userId
        });

        if (existingEntry) {
            // Si la entrada existe, actualizar la categoría específica
            const updatedEntry = await prisma.library.update({
                where: { id: existingEntry.id },
                data: { [category]: true },
            });

            return res.status(200).json(updatedEntry);
        }

        const libraryEntry = await prisma.library.create({
            data: {
                userId,
                audiobookId,
                // Mantener el estado anterior de otros campos y solo marcar la nueva categoría
                saved: existingEntry?.saved || false,
                favorite: existingEntry?.favorite || false,
                played: existingEntry?.played || false,
                finished: existingEntry?.finished || false,
                recommended: existingEntry?.recommended || false,
                [category]: true, // Solo marcar la categoría en true
            },
        });
        return res.status(200).json(libraryEntry);
    } catch (error) {
        console.error("Error al añadir el audiolibro a la categoría:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};



// Obtener los libros favoritos o reproducidos de un usuario
const getUserLibraryCategory = async (req, res) => {
    const { userId, category } = req.params;

    if (!userId || !category) {
        return res.status(400).json({ message: "userId y category son obligatorios." });
    }

    try {
        // Validar que la categoría es válida
        const categoryField = ["saved", "favorite", "played", "finished", "recommended"].includes(category)
            ? category
            : "saved";

        // Obtener los libros de la biblioteca del usuario ordenados por la categoría seleccionada y updatedAt
        const libraryEntries = await prisma.library.findMany({
            where: {
                userId,
                [categoryField]: true,
            },
            include: { audiobook: true }, // Incluir detalles del audiolibro
            orderBy: [
                { updatedAt: "desc" }, // Ordenar por la fecha de actualización más reciente
                { id: "desc" }, // Como respaldo, ordenar por ID en orden descendente
            ],
        });

        res.status(200).json({
            [category]: {
                audiobooks: libraryEntries.map((entry) => entry.audiobook),
                count: libraryEntries.length,
            },
        });
    } catch (error) {
        console.error("Error al obtener los libros por categoría:", error);
        res.status(500).json({ error: "Error al obtener los libros por categoría.", details: error.message });
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
            recommended: [],
        };

        libraryEntries.forEach((entry) => {
            if (entry.saved) libraryState.saved.push(entry.audiobook.id);
            if (entry.favorite) libraryState.favorite.push(entry.audiobook.id);
            if (entry.played) libraryState.played.push(entry.audiobook.id);
            if (entry.finished) libraryState.finished.push(entry.audiobook.id);
            if (entry.recommended) libraryState.recommended.push(entry.audiobook.id);
        });

        res.status(200).json(libraryState);
    } catch (error) {
        console.error("Error al obtener el estado de la biblioteca:", error);
        res.status(500).json({ message: "Error al obtener el estado de la biblioteca." });
    }
};

const updateLastPosition = async (req, res) => {
    const { userId, audiobookId, lastPosition } = req.body;

    if (!userId || !audiobookId || lastPosition === undefined) {
        return res.status(400).json({ message: "userId, audiobookId y lastPosition son obligatorios." });
    }

    try {
        // Verificar si la entrada en la biblioteca existe
        const libraryEntry = await prisma.library.findFirst({
            where: { userId, audiobookId },
        });

        if (!libraryEntry) {
            return res.status(404).json({ message: "Audiolibro no encontrado en la biblioteca del usuario." });
        }

        // Actualizar la posición de reproducción
        const updatedEntry = await prisma.library.update({
            where: { id: libraryEntry.id },
            data: { lastPosition },
        });

        res.status(200).json(updatedEntry);
    } catch (error) {
        console.error("Error al actualizar la posición de reproducción:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};


// Eliminar un libro de la biblioteca del usuario
const removeBookFromLibraryCategory = async (req, res) => {
    const { userId, audiobookId, category } = req.params; 

    if (!userId || !audiobookId || !category) {
        return res.status(400).json({ message: "userId, audiobookId y category son obligatorios." }); // Actualiza el mensaje de error
    }

    try {
        // Buscar la entrada en la biblioteca
        const libraryEntry = await prisma.library.findFirst({
            where: {
                userId: userId,  // Usa 'userId' en lugar de 'firebaseUserId'
                audiobookId: parseInt(audiobookId, 10),
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
            recommended: libraryEntry.recommended,
        };

        updateData[category] = false;

        // Actualizar la entrada en la biblioteca
        const updatedEntry = await prisma.library.update({
            where: { id: libraryEntry.id },
            data: updateData,
        });

        // Si todos los campos están desmarcados, eliminar la entrada
        if (!updatedEntry.saved && !updatedEntry.favorite && !updatedEntry.played && !updatedEntry.finished && !updatedEntry.recommended) {
            await prisma.library.delete({
                where: { id: updatedEntry.id },
            });
            return res.status(200).json({ message: "Audiolibro removido completamente de biblioteca" }); // No content response
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
    updateLastPosition,
    fetchLibraryState,
    removeBookFromLibraryCategory,
};
