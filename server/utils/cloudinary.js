//MODULO PARA SUBIR IMAGENES AL CLOUDINARY
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "sportifyCloud",
    api_key: "166833119645142",
    api_secret: "30OETcQAxpObCu0bLhiE63s21KI"
})

const subirImagen = async (rutaDeImagen) => {
    try {
        const resultado = await cloudinary.uploader.upload(rutaDeImagen, {
          folder: 'portadas', 
        });
        return resultado;
    } catch (error) {
        throw new Error('Error al subir la imagen: ' + error.message);
    }
}

export default subirImagen;
