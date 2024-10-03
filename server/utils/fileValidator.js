console.log("fileValidator.js loaded");

const isPDF = (file) => {
    // Verificar si el archivo tiene la extensión '.pdf'
    if (!file || !file.name) {
        return false;
    }
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return fileExtension === 'pdf';
};

module.exports = {
    isPDF,
};
