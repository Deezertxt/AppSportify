// Validación del documento PDF
 export const isValidPdf = async (file) => {
    const maxSizeInMB = 50; // Tamaño máximo en MB
    const allowedTypes = ["application/pdf"]; // Tipos de archivo permitidos

    // Validar tipo de archivo
    if (!allowedTypes.includes(file.type)) {
        return { isValid: false, error: "Solo se permiten archivos PDF." };
    }

    // Validar tamaño
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convertir MB a Bytes
    if (file.size > maxSizeInBytes) {
        return { isValid: false, error: `El tamaño del archivo no debe exceder ${maxSizeInMB} MB.` };
    }

    return { isValid: true };
};