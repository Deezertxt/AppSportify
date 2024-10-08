const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se almacenarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Añadir un timestamp para evitar nombres duplicados
    }
});

// Función para verificar el tipo de archivo
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Solo se permiten imágenes (jpeg, jpg, png)');
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Límite de tamaño de archivo de 5MB
}).single('file'); // Solo un archivo a la vez

// Controlador para manejar la subida del archivo
const uploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No se subió ningún archivo.' });
        }

        // Aquí puedes realizar más validaciones o guardar la referencia del archivo en la base de datos
        res.status(200).json({ message: 'Archivo subido exitosamente', file: req.file });
    });
};

module.exports = {
    uploadFile,
};
