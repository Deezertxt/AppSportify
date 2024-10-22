export const isValidCover = async (file, minWidth = 300, minHeight = 300, maxSizeMB = 5) => {
    try {
        if (!file || !file.name) {
            return "Archivo inválido o sin nombre.";
        }

        // Verificar tamaño de archivo (máximo 5 MB)
        const fileSizeMB = file.size / (1024 * 1024); // Convertir bytes a MB
        if (fileSizeMB > maxSizeMB) {
            return `El tamaño del archivo (${fileSizeMB.toFixed(2)} MB) excede el máximo permitido de ${maxSizeMB} MB.`;
        }

        // Verificar extensión del archivo
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (fileExtension !== 'jpg' && fileExtension !== 'jpeg' && fileExtension !== 'png' && fileExtension !== 'webp') {
            return `Extensión de archivo no permitida: ${fileExtension}. Solo se permiten jpg, jpeg, png o webp.`;
        }

        // Leer archivo y verificar dimensiones de la imagen
        const reader = new FileReader();
        const fileDataURL = await new Promise((resolve, reject) => {
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(`Error al leer el archivo: ${error}`);
            reader.readAsDataURL(file);
        });

        const img = new Image();
        const isValidImage = await new Promise((resolve, reject) => {
            img.onload = () => {
                const isWidthValid = img.width >= minWidth;
                const isHeightValid = img.height >= minHeight;
                if (isWidthValid && isHeightValid) {
                    resolve(true);
                } else {
                    resolve(`Dimensiones de la imagen inválidas: ${img.width}x${img.height}. Se requiere al menos ${minWidth}x${minHeight} píxeles.`);
                }
            };
            img.onerror = (error) => reject(`Error al cargar la imagen: ${error}`);
            img.src = fileDataURL;
        });

        // Si es válida, devolver true, de lo contrario devolver el mensaje de error
        return isValidImage === true ? true : isValidImage;

    } catch (error) {
        return `Ocurrió un error al verificar la portada: ${error}`;
    }
};
