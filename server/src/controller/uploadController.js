// server/src/controllers/uploadController.js
const { storage } = require('../conf/firebase'); // Firebase Storage
const { ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');

const uploadFilesToFirebase = async (req, res) => {
    console.log("req.files", req.files); // Verifica qué datos están llegando

    try {
        // Verifica que los archivos estén presentes
        if (!req.files || !req.files.pdfFile || !req.files.portadaFile) {
            return res.status(400).json({ error: "Faltan archivos PDF o portada." });
        }

        const pdfFile = req.files.pdfFile[0]; // Multer devuelve los archivos como un array
        const portadaFile = req.files.portadaFile[0];

        const storageRefPdf = ref(storage, `uploads/pdf/${pdfFile.originalname}`);
        const storageRefCover = ref(storage, `uploads/covers/${portadaFile.originalname}`);

        // Subir los archivos a Firebase Storage
        const uploadTaskPdf = uploadBytesResumable(storageRefPdf, pdfFile.buffer);
        const uploadTaskCover = uploadBytesResumable(storageRefCover, portadaFile.buffer);

        // Esperar que ambos archivos se suban
        await Promise.all([uploadTaskPdf, uploadTaskCover]);

        // Obtener las URLs de los archivos subidos
        const pdfUrl = await getDownloadURL(uploadTaskPdf.snapshot.ref);
        const portadaUrl = await getDownloadURL(uploadTaskCover.snapshot.ref);

        // Responder con las URLs de los archivos
        res.status(200).json({
            pdfUrl,
            portadaUrl
        });
    } catch (error) {
        console.error('Error subiendo archivos a Firebase:', error);
        res.status(500).json({ error: 'Error al subir archivos a Firebase' });
    }
};

module.exports = { uploadFilesToFirebase };


