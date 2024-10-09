const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        // Verificar si la carpeta de destino existe
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);  // Establecer la carpeta de destino
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Establecer el nombre del archivo
    }
});

// Función para verificar el tipo de archivo
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/; // Agregamos PDF si también subes documentos
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Solo se permiten imágenes (jpeg, jpg, png) y archivos PDF');
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
}).fields([
    { name: 'portada', maxCount: 1 }, // Campo para la portada
    { name: 'pdf', maxCount: 1 }       // Campo para el archivo PDF
]);

// Controlador para manejar la subida de archivos
const uploadFiles = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        
        if (!req.files || !req.files['portada'] || !req.files['pdf']) {
            return res.status(400).json({ error: 'Se deben subir tanto la portada como el archivo PDF.' });
        }

        // Muestra la información de los archivos subidos
        console.log('Portada subida:', req.files['portada'][0]);
        console.log('PDF subido:', req.files['pdf'][0]);

        res.status(200).json({
            message: 'Archivos subidos exitosamente',
            portadaPath: `/uploads/${req.files['portada'][0].filename}`,
            pdfPath: `/uploads/${req.files['pdf'][0].filename}`
        });
    });
};

module.exports = {
    uploadFiles,
};
