import express from 'express';
import {
    createAudiobook,
    deleteAudioBook,
    getAudioBookById,
    updateAudiobook,
} from "../controllers/audiobookController.js";
//const express = require("express");
// const {
//     createAudiobook,
//     deleteAudioBook,
//     getAudioBookById,
//     updateAudiobook,
// } = require("../controller/audiobookController");
const router = express.Router();

router.post("/register", createAudiobook);
router.delete("/delete/:id", deleteAudioBook);
router.get("/get/:id", getAudioBookById);
router.put("/put/:id", updateAudiobook);

//module.exports = router;

export default router;