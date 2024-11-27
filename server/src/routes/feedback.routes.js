// server/src/routes/feedback.routes.js
const express = require('express');
const router = express.Router();
const {createFeedback, checkUserFeedback, getFeedbacksByAudiobook, toggleLikeFeedback,getUserLikes, deleteFeedback} = require("../controller/feedbackController");


router.post('/subir', createFeedback);
router.get('/check/:userId/:audiobookId', checkUserFeedback);
router.get('/get/:audiobookId', getFeedbacksByAudiobook);
router.patch('/like/:feedbackId', toggleLikeFeedback);
router.get('/likes/:userId', getUserLikes);
router.delete('/delete/:feedbackId', deleteFeedback);

module.exports = router;
