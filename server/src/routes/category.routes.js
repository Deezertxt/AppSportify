const express = require('express');
const router = express.Router();
const { createCategory , updateCategory, getCategories} = require('../controller/categoryController');

// Ruta para crear una categoría
router.post('/create', createCategory);
router.put('/update/:id', updateCategory);
router.get('/get',getCategories);

module.exports = router;
