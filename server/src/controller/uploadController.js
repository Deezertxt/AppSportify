// server/src/controllers/uploadController.js
const { storage } = require('../conf/firebase'); // Firebase Storage
const { ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');

<<<<<<< HEAD
const uploadFilesToFirebase = async (req, res) => {
=======
const credentialsPath = path.join(__dirname, './google-key.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

const gcsClient = new Storage(); // Inicializa el cliente de GCS

// Función para subir archivos a Google Cloud Storage
const uploadToGCS = async (fileBuffer, filename, folder) => {
    const bucketName = process.env.GCS_BUCKET_NAME; // Cambia esto por tu nombre de bucket
    const bucket = gcsClient.bucket(bucketName);
    const file = bucket.file(`${folder}/${filename}`);

    await file.save(fileBuffer); // Sube el archivo al bucket
    return `gs://${bucketName}/${folder}/${filename}`; // Devuelve la URL en formato GCS
};

// Función para subir la portada y devolver una URL pública en formato HTTP
const uploadCoverToGCS = async (fileBuffer, filename) => {
    const bucketName = process.env.GCS_BUCKET_NAME; // Cambia esto por tu nombre de bucket
    const bucket = gcsClient.bucket(bucketName);
    const file = bucket.file(`uploads/covers/${filename}`);

    await file.save(fileBuffer, { resumable: false, contentType: 'image/jpeg' });
    return `https://storage.googleapis.com/${bucketName}/uploads/covers/${filename}`;
};

// Función para manejar la carga de archivos
const uploadFilesToGCS = async (req, res) => {
>>>>>>> origin/main
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

<<<<<<< HEAD
module.exports = { uploadFilesToFirebase };
=======
module.exports = { uploadFilesToGCS };
>>>>>>> origin/main
