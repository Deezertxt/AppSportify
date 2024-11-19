const express = require("express");
const router = express.Router();
const {
    createAudiobook,
    deleteAudioBook,
    getAudioBookById,
    updateAudiobook,
    getAudiobooks,
    getAudiobooksByCategory,
} = require("../controller/audiobookController");

router.post("/register", createAudiobook);
router.delete("/delete/:id", deleteAudioBook);
router.get("/get", getAudiobooks);
router.get("/get/:id", getAudioBookById);
router.get("/get/category/:categoryId", getAudiobooksByCategory);
router.put("/put/:id", updateAudiobook);

module.exports = router;
