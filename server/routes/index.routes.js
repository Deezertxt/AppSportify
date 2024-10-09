import { Router } from "express";
import taskRoutes from "./task.routes.js";  // Rutas relacionadas con tareas
import uploadRoutes from "./upload.routes.js";  // Rutas para las subidas de archivos

const router = Router();

// Ruta de prueba para verificar la conexión
router.get("/ping", (req, res) => {
    res.json({ message: "Server is running and reachable" });
});

// Ruta para tareas
router.use("/tasks", taskRoutes);

// Ruta para las subidas de archivos (audiolibros)
router.use("/upload", uploadRoutes);

export default router;
