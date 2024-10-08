export const isValidCover = (file) => {
    try {
        if (!file || !file.name) {
            console.error('Archivo inválido o sin nombre.');
            return false;
        }
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (fileExtension !== 'jpg' && fileExtension !== 'jpeg' && fileExtension !== 'png') {
            console.error(`Extensión de archivo no permitida: ${fileExtension}`);
            return false;
        }
        const reader = new FileReader();
        const fileDataURL = await new Promise((resolve, reject) => {
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(`Error al leer el archivo: ${error}`);
            reader.readAsDataURL(file);
        });
        const img = new Image();
        const isValidImage = await new Promise((resolve, reject) => {
            img.onload = () => {
                const isWidthValid = img.width >= width;
                const isHeightValid = img.height >= height;
                if (isWidthValid && isHeightValid) {
                    resolve(true);
                } else {
                    console.error(`Dimensiones de la imagen: ${img.width}x${img.height}. Se esperaba al menos ${width}x${height}.`);
                    resolve(false);
                }
            };
            img.onerror = (error) => reject(`Error al cargar la imagen: ${error}`);
            img.src = fileDataURL;
        });
        return isValidImage;
    } catch (error) {
        console.error('Ocurrió un error al verificar la portada:', error);
        return false;
    }
};
/* FLUJO
1. Verificar que el archivo sea válido y tenga un nombre.
2. Extraer la extensión y verificar que sea una imagen (jpg, jpeg, png).
3. Leer el archivo usando FileReader y convertirlo a data URL.
4. Crear una imagen con Image y cargarla.
5. Verificar que las dimensiones de la imagen sean mayores o iguales a las especificadas.
6. Retornar true si la imagen es válida o false si no lo es.
*/