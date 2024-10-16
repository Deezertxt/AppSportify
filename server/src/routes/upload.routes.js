const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFilesToFirebase } = require('../controller/uploadController'); // Asegúrate de que la ruta sea correcta

const upload = multer({storage: multer.memoryStorage()});
// Ruta para subir archivos
router.post('/upload', uploadfields([{name: 'pdfFile', maxCount:1},
    {name: 'portadaFile', maxCount:1}
]), uploadFilesToFirebase);

module.exports = router;
