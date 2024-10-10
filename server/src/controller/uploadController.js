const {storage}= require ('../conf/firebase'); 
const { ref, uploadBytesResumable, getDownloadURL } = require ('firebase/storage');

const uploadFilesToFirebase = async (pdfFile, portadaFile) => {
    try {
        const storageRefPdf = ref(storage, `uploads/pdf/${pdfFile.name}`);
        const storageRefCover = ref(storage, `uploads/covers/${portadaFile.name}`);

        // Subir el archivo PDF
        const uploadTaskPdf = uploadBytesResumable(storageRefPdf, pdfFile);

        // Subir la portada
        const uploadTaskCover = uploadBytesResumable(storageRefCover, portadaFile);

        // Esperar a que ambos archivos se suban
        await Promise.all([uploadTaskPdf, uploadTaskCover]);

        // Obtener las URLs de los archivos subidos
        const pdfUrl = await getDownloadURL(uploadTaskPdf.snapshot.ref);
        const portadaUrl = await getDownloadURL(uploadTaskCover.snapshot.ref);

        return {
            status: 200,
            data: {
                pdfUrl,
                portadaUrl
            }
        };
    } catch (error) {
        console.error('Error subiendo archivos a Firebase:', error);
        throw new Error('Error al subir archivos a Firebase');
    }
};

module.exports={ uploadFilesToFirebase };
