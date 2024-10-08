import express from 'express'
import { createCategory , updateCategory, getCategories} from '../controllers/categoryController.js';
//const express = require('express');
const router = express.Router();


// Ruta para crear una categoría
router.post('/create', createCategory);
router.put('/update/:id', updateCategory);
router.get('/get',getCategories);

//module.exports = router;
export default router;