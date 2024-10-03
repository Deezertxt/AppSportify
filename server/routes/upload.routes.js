import { Router } from "express";
import { uploadFile } from "../controllers/uploadController.js"; 
import { fileValidator } from "../utils/fileValidator.js";

const router = Router();

router.post('/validate-pdf', (req, res) => {
    const file = req.files?.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const isPdf = isPDF(file);
    if (isPdf) {
        return res.status(200).json({ message: 'Valid PDF file' });
    } else {
        return res.status(400).json({ message: 'Invalid file type. Only PDF allowed.' });
    }
});

export default router;
