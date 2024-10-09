const express = require('express');
const router = express.Router();
const { uploadFiles } = require('../controller/uploadController'); // Asegúrate de que la ruta sea correcta

// Ruta para subir archivos
router.post('/upload', uploadFiles);

module.exports = router;
