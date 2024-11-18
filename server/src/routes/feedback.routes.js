// server/src/routes/feedback.routes.js
const express = require('express');
const router = express.Router();
const {createFeedback, getFeedbacksByAudiobook, likeFeedback, deleteFeedback} = require("../controller/feedbackController");


// Crear feedback
router.post('/subir', createFeedback);

// Obtener feedbacks de un audiolibro
router.get('/get/:audiobookId', getFeedbacksByAudiobook);

// Dar like a un feedback
router.patch('/like/:feedbackId', likeFeedback);

// Eliminar feedback
router.delete('/delete/:feedbackId', deleteFeedback);

module.exports = router;
