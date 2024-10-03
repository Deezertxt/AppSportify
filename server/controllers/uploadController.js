const { isPDF } = require('../utils/fileValidator');

const uploadFile = (req, res) => {
    const file = req.file; // Suponiendo que uses un middleware como multer para manejar la subida de archivos

    if (!isPDF(file)) {
        return res.status(400).json({ error: 'El archivo subido no es un PDF.' });
    }

    // Continúa con el proceso de guardado del archivo
    res.status(200).json({ message: 'Archivo subido exitosamente.' });
};

module.exports = {
    uploadFile,
}; 