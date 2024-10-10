const express = require('express');
const router = express.Router();
const { uploadFilesToFirebase } = require('../controller/uploadController'); // Asegúrate de que la ruta sea correcta

// Ruta para subir archivos
router.post('/upload', uploadFilesToFirebase);

module.exports = router;
