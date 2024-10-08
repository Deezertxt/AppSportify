import { Router } from "express";
import { pool } from "../db.js";
import taskRoutes from "./task.routes.js";
import uploadRoutes from "./upload.routes.js";

const router = Router();

router.get("/ping", async (req, res) => {
    const [rows] = await pool.query("SELECT 1 + 1 as result");
    console.log(rows[0]);
    res.json(rows[0]);
});

// ruta para tareas
router.use("/tasks", taskRoutes);

// ruta para las subidas de archivos
router.use("/upload", uploadRoutes);

export default router;