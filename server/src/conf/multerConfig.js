const multer = require('multer');

// Configuración de almacenamiento para Multer
const storage = multer.memoryStorage(); // Usamos memoryStorage para trabajar con buffers

// Configuración de filtro para aceptar solo PDFs y archivos de imagen (jpg, png)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
        cb(null, true); // Aceptar el archivo
    } else {
        cb(new Error('Tipo de archivo no permitido. Solo se aceptan PDFs e imágenes.'), false);
    }
};

// Instancia de multer con configuración
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 50, // Limita el tamaño del archivo a 50MB
    }
});

module.exports = upload;
