
// server/src/routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFilesToGCS } = require('../controller/uploadController');

const upload = multer({ storage: multer.memoryStorage() }); // Usa almacenamiento en memoria

// Configuración de la ruta para manejar múltiples archivos
router.post('/upload', upload.fields([
    { name: 'pdfFile', maxCount: 1 }, // Asegúrate de que los nombres coincidan con los del frontend
    { name: 'portadaFile', maxCount: 1 }
]), uploadFilesToGCS);

module.exports = router;
