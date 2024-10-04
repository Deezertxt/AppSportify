import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

//const cloudinary = require('cloudinary').v2;
dotenv.config();
//MODULO PARA SUBIR IMAGENES AL CLOUDINARY
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
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
