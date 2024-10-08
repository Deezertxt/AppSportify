const express = require('express');
const router = express.Router();
const { addBookToLibrary, getUserLibrary, removeBookFromLibrary } = require('../controller/libraryController');

// Rutas de la biblioteca
router.post('/add', addBookToLibrary);  // Agregar un libro a la biblioteca
router.get('/get/:userId', getUserLibrary);  // Obtener la biblioteca del usuario
router.delete('/delete/:userId/:audiobookId', removeBookFromLibrary);  // Eliminar un libro de la biblioteca

module.exports = router;
