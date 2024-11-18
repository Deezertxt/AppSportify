// server/src/controllers/feedbackController.js
const { prisma } = require('../conf/db');

async function updateAverageRating(audiobookId) {
    const feedbacks = await prisma.feedback.findMany({
        where: { audiobookId },
        select: { rating: true },
    });

    if (feedbacks.length === 0) return 0;

    const totalRating = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
    const averageRating = totalRating / feedbacks.length;

    await prisma.audiobook.update({
        where: { id: audiobookId },
        data: { averageRating },
    });

    return averageRating;
}

// Crear feedback
const createFeedback = async (req, res) => {
    console.log(req.body);
    const { userId, audiobookId, comment, rating } = req.body;
    
    try {
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


// Obtener feedbacks de un audiolibro
const getFeedbacksByAudiobook = async (req, res) => {
  const { audiobookId } = req.params;

  try {
    const feedbacks = await prisma.feedback.findMany({
      where: { audiobookId: Number(audiobookId) },
      include: { user: { select: { username: true, profilePicUrl: true } } }, // Incluye información del usuario
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Error fetching feedbacks', details: error.message });
  }
};

// Dar like a un comentario
const likeFeedback = async (req, res) => {
  const { feedbackId } = req.params;

  try {
    const updatedFeedback = await prisma.feedback.update({
      where: { id: Number(feedbackId) },
      data: { likes: { increment: 1 } },
    });

    res.status(200).json(updatedFeedback);
  } catch (error) {
    console.error('Error liking feedback:', error);
    res.status(500).json({ error: 'Error liking feedback', details: error.message });
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
  getFeedbacksByAudiobook,
  likeFeedback,
  deleteFeedback,
};
