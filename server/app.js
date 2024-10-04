import express from 'express';
import { PrismaClient } from '@prisma/client';
import { PORT } from './config/config.js';
import {subirImagen} from './utils/cloudinary.js' //metodo para subir imagen

const app = express();
const prismaClient = new PrismaClient();
app.use(express.json());
app.use(fileUpload());

// app.get('/', (req, res) => {
//     res.send("funca")
// })




app.listen(PORT, () => {
    console.log(`Server corriendo en puerto ${PORT}`);
});
