import express from 'express';
import { addBookToLibrary, getUserLibrary, removeBookFromLibrary } from '../controllers/libraryController.js';
//const express = require('express');
const router = express.Router();


// Rutas de la biblioteca
router.post('/add', addBookToLibrary);  // Agregar un libro a la biblioteca
router.get('/get/:userId', getUserLibrary);  // Obtener la biblioteca del usuario
router.delete('/delete/:userId/:audiobookId', removeBookFromLibrary);  // Eliminar un libro de la biblioteca

//module.exports = router;
export default router;