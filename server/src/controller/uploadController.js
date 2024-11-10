const { Storage } = require('@google-cloud/storage');
const path = require('path');

const credentialsPath = path.join(__dirname, './google-key.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

const gcsClient = new Storage(); // Inicializa el cliente de GCS

// Función para subir archivos a Google Cloud Storage
const uploadToGCS = async (fileBuffer, filename, folder) => {
    const bucketName = 'sportify-2'; // Cambia esto por tu nombre de bucket
    const bucket = gcsClient.bucket(bucketName);
    const file = bucket.file(`${folder}/${filename}`);

    await file.save(fileBuffer); // Sube el archivo al bucket
    return `gs://${bucketName}/${folder}/${filename}`; // Devuelve la URL en formato GCS
};

// Función para subir la portada y devolver una URL pública en formato HTTP
const uploadCoverToGCS = async (fileBuffer, filename) => {
    const bucketName = 'sportify-2'// Cambia esto por tu nombre de bucket
    const bucket = gcsClient.bucket(bucketName);
    const file = bucket.file(`uploads/covers/${filename}`);

    await file.save(fileBuffer, { resumable: false, contentType: 'image/jpeg' });
    return `https://storage.googleapis.com/${bucketName}/uploads/covers/${filename}`;
};

// Función para manejar la carga de archivos
const uploadFilesToGCS = async (req, res) => {
    console.log("req.files", req.files); // Verifica qué datos están llegando

    try {
        // Verifica que los archivos estén presentes
        if (!req.files || !req.files.pdfFile || !req.files.portadaFile) {
            return res.status(400).json({ error: "Faltan archivos PDF o portada." });
        }

        const pdfFile = req.files.pdfFile[0]; // Multer devuelve los archivos como un array
        const portadaFile = req.files.portadaFile[0];

        // Sube el PDF a GCS en formato `gs://`
        const pdfGcsUrl = await uploadToGCS(pdfFile.buffer, pdfFile.originalname, 'uploads/pdf');

        // Sube la portada a GCS y devuelve una URL pública en formato HTTP
        const portadaGcsUrl = await uploadCoverToGCS(portadaFile.buffer, portadaFile.originalname);

        // Responder con las URLs de los archivos subidos
        res.status(200).json({
            pdfUrl: pdfGcsUrl,
            portadaUrl: portadaGcsUrl
        });
    } catch (error) {
        console.error('Error procesando archivos:', error);
        res.status(500).json({ error: 'Error procesando archivos', details: error.message });
    }
};

module.exports = { uploadFilesToGCS };