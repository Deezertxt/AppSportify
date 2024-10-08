import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { uploadFile } from "../controller/uploadController"; 

// Crear el directorio de subidas si no existe
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de Multer para el almacenamiento y validación
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Carpeta donde se guardarán los archivos subidos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Evita nombres duplicados
  }
});

// Filtro para limitar los tipos de archivos
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Aceptar el archivo
  } else {
    req.fileValidationError = 'Tipo de archivo no permitido. Solo se aceptan JPG, PNG o PDF';
    cb(null, false); // Rechazar el archivo
  }
};

// Inicializa multer con la configuración de almacenamiento y filtro de archivos
const upload = multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 5 } }); // Limitar a 5MB

const router = Router();

// Ruta POST para subir archivos
router.post("/", upload.single('file'), uploadFile);

export default router;
