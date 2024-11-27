const { Storage } = require('@google-cloud/storage');
const path = require('path');

const credentialsPath = path.join(__dirname, './google-key.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

const gcsClient = new Storage(); // Inicializa el cliente de GCS

const uploadToGCS = async (fileBuffer, filename, folder) => {
    const bucketName = process.env.GCS_BUCKET_NAME;
    const bucket = gcsClient.bucket(bucketName);
    const file = bucket.file(`${folder}/${filename}`);

    await file.save(fileBuffer); // Sube el archivo al bucket
    return `gs://${bucketName}/${folder}/${filename}`; // Devuelve la URL en formato GCS
};

const uploadCoverToGCS = async (fileBuffer, filename) => {
    const bucketName = process.env.GCS_BUCKET_NAME;
    const bucket = gcsClient.bucket(bucketName);
    const file = bucket.file(`uploads/covers/${filename}`);

    await file.save(fileBuffer, { resumable: false, contentType: 'image/jpeg' });
    return `https://storage.googleapis.com/${bucketName}/uploads/covers/${filename}`;
};

const uploadFilesToGCS = async (req, res) => {
    try {
        const response = {};

        // Subir PDF si está presente
        if (req.files?.pdfFile) {
            const pdfFile = req.files.pdfFile[0];
            const pdfGcsUrl = await uploadToGCS(pdfFile.buffer, pdfFile.originalname, 'uploads/pdf');
            response.pdfUrl = pdfGcsUrl;
        }

        // Subir portada si está presente
        if (req.files?.portadaFile) {
            const portadaFile = req.files.portadaFile[0];
            const portadaGcsUrl = await uploadCoverToGCS(portadaFile.buffer, portadaFile.originalname);
            response.portadaUrl = portadaGcsUrl;
        }

        // Responder con las URLs de los archivos subidos
        if (Object.keys(response).length === 0) {
            return res.status(400).json({ error: 'No files provided for upload.' });
        }

        res.status(200).json(response);
    } catch (error) {
        console.error('Error procesando archivos:', error);
        res.status(500).json({ error: 'Error procesando archivos', details: error.message });
    }
};

module.exports = { uploadFilesToGCS, uploadToGCS, uploadCoverToGCS };
