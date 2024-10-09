import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createAudiobook } from "../controllers/audiobookController.js";  // Ruta correcta del controlador

// Crear el directorio de subidas si no existe
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de Multer para el almacenamiento y validación de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Carpeta donde se guardarán los archivos subidos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Evita nombres duplicados
  }
});

// Filtro para limitar los tipos de archivos permitidos (JPG, PNG, PDF)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Aceptar el archivo
  } else {
    req.fileValidationError = 'Tipo de archivo no permitido. Solo se aceptan JPG, PNG o PDF';
    cb(null, false); // Rechazar el archivo
  }
};

// Inicializa multer para manejar múltiples archivos (portada y PDF)
const upload = multer({ 
  storage, 
  fileFilter, 
  limits: { fileSize: 1024 * 1024 * 5 } // Límite de 5MB por archivo
});

// Crear el router
const router = Router();

// Ruta POST para subir un audiolibro con portada y PDF
router.post("/audiobook", upload.fields([
  { name: 'coverImage', maxCount: 1 },   // Campo 'coverImage' en el formulario HTML para la portada
  { name: 'pdfFile', maxCount: 1 }       // Campo 'pdfFile' en el formulario HTML para el PDF
]), (req, res) => {
    if (req.fileValidationError) {
      return res.status(400).json({ error: req.fileValidationError });
    }

    createAudiobook(req, res);  // Llamar a la función para crear el audiolibro en la base de datos
});

export default router;
