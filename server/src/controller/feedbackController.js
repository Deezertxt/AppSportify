// server/src/controllers/feedbackController.js
const { prisma } = require('../conf/db');

async function updateAverageRating(audiobookId) {
  const feedbacks = await prisma.feedback.findMany({
    where: { audiobookId },
    select: { rating: true },
  });

  if (feedbacks.length === 0) return 0;

  const totalRating = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
  let averageRating = totalRating / feedbacks.length;

  // Redondear a un decimal
  averageRating = parseFloat(averageRating.toFixed(1));

  await prisma.audiobook.update({
    where: { id: audiobookId },
    data: { averageRating },
  });

  return averageRating;
}


// Crear feedback
const createFeedback = async (req, res) => {
  const { userId, audiobookId, comment, rating } = req.body;

  try {
      // Verificar si ya existe feedback del usuario para este audiolibro
      const existingFeedback = await prisma.feedback.findUnique({
          where: {
              userId_audiobookId: {
                  userId,
                  audiobookId: parseInt(audiobookId, 10),
              },
          },
      });

      if (existingFeedback) {
          return res.status(400).json({ error: "Ya has dejado un comentario para este audiolibro." });
      }

      // Crear feedback
      const newFeedback = await prisma.feedback.create({
          data: {
              userId,
              audiobookId: parseInt(audiobookId, 10),
              comment,
              rating,
          },
      });

      // Actualizar el promedio de calificación del audiolibro
      const averageRating = await updateAverageRating(audiobookId);

      res.status(200).json({ newFeedback, averageRating });
  } catch (error) {
      console.error("Error creando feedback:", error);
      res.status(500).json({ error: "Error creando feedback" });
  }
};


const checkUserFeedback = async (req, res) => {
  const { userId, audiobookId } = req.params;

  try {
      const feedback = await prisma.feedback.findUnique({
          where: {
              userId_audiobookId: {
                  userId,
                  audiobookId: parseInt(audiobookId, 10),
              },
          },
      });

      res.status(200).json({ exists: !!feedback });
  } catch (error) {
      console.error("Error verificando feedback:", error);
      res.status(500).json({ error: "Error verificando feedback" });
  }
};


// Obtener feedbacks de un audiolibro
const getFeedbacksByAudiobook = async (req, res) => {
  const { audiobookId } = req.params;

  try {
    const feedbacks = await prisma.feedback.findMany({
      where: { audiobookId: Number(audiobookId) },
      include: { user: { select: { id: true, username: true, profilePicUrl: true } } }, // Incluye información del usuario
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Error fetching feedbacks', details: error.message });
  }
};


const toggleLikeFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  const { userId } = req.body;

  try {
    // Verificar si el usuario ya dio like
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_feedbackId: {
          userId: userId,
          feedbackId: Number(feedbackId),
        },
      },
    });

    if (existingLike) {
      // Si ya dio like, eliminarlo y decrementar contador
      await prisma.like.delete({
        where: {
          userId_feedbackId: {
            userId: userId,
            feedbackId: Number(feedbackId),
          },
        },
      });

      const updatedFeedback = await prisma.feedback.update({
        where: { id: Number(feedbackId) },
        data: {
          likes: { decrement: 1 },
        },
      });

      return res.status(200).json({ message: "Like eliminado", feedback: updatedFeedback });
    } else {
      // Si no dio like, agregarlo y aumentar contador
      await prisma.like.create({
        data: {
          userId: userId,
          feedbackId: Number(feedbackId),
        },
      });

      const updatedFeedback = await prisma.feedback.update({
        where: { id: Number(feedbackId) },
        data: {
          likes: { increment: 1 },
        },
      });

      return res.status(200).json({ message: "Like registrado", feedback: updatedFeedback });
    }
  } catch (error) {
    console.error("Error al alternar like:", error);
    res.status(500).json({ error: "Error al alternar like", details: error.message });
  }
};

const getUserLikes = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "userId es obligatorio." });
  }

  try {
    // Obtener los likes del usuario para los comentarios (feedbacks)
    const userLikes = await prisma.like.findMany({
      where: { userId },
      include: {
        feedback: {
          include: {
            audiobook: true, // Incluir detalles del audiolibro
            user: { select: { username: true, profilePicUrl: true } }, // Incluir información del usuario del feedback
          },
        },
      },
    });

    const likedAudiobooks = userLikes.map(like => ({
      audiobookId: like.feedback.audiobook.id,
      feedbackId: like.feedback.id,
      comment: like.feedback.comment,
      rating: like.feedback.rating,
      audiobookTitle: like.feedback.audiobook.title,
      audiobookAuthor: like.feedback.audiobook.author,
      feedbackUser: like.feedback.user.username,
    }));

    res.status(200).json(likedAudiobooks);
  } catch (error) {
    console.error("Error obteniendo los likes del usuario:", error);
    res.status(500).json({ message: "Error al obtener los likes del usuario." });
  }
};


// Eliminar feedback
const deleteFeedback = async (req, res) => {
  const { feedbackId } = req.params;

  try {
    await prisma.feedback.delete({
      where: { id: Number(feedbackId) },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ error: 'Error deleting feedback', details: error.message });
  }
};

module.exports = {
  createFeedback,
  checkUserFeedback,
  getFeedbacksByAudiobook,
  getUserLikes,
  toggleLikeFeedback,
  deleteFeedback,
};
