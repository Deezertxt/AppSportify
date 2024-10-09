import express from 'express';
import cors from 'cors';
import uploadRoutes from './routes/upload.routes.js';  // Importa correctamente las rutas
import indexRoutes from './routes/index.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;  // Puedes establecer el puerto en .env o usar 3000 por defecto

// Configuración básica de Express
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configuración de CORS
app.use(cors({
    origin: ["http://localhost:5502"],  // Cambia esto según tu configuración del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
}));

// Registrar rutas
app.use('/api/upload', uploadRoutes);   // Asigna las rutas de 'upload'
app.use('/api', indexRoutes);           // Asigna las rutas principales de la API

// Escuchar en el puerto definido
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
