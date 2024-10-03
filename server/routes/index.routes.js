import { Router } from "express";
import { pool } from "../db.js";
import taskRoutes from "./task.routes.js";

const router = Router();

router.get("/ping", async (req, res) => {
    const [rows] = await pool.query("SELECT 1 + 1 as result");
    console.log(rows[0]);
    res.json(rows[0]);
});

router.use("/tasks", taskRoutes);

export default router;