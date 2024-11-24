const express = require('express');
const router = express.Router();
const { addBookToLibraryCategory, getUserLibraryCategory, fetchLibraryState, removeBookFromLibraryCategory } = require('../controller/libraryController');

// Rutas de la biblioteca
router.post('/add', addBookToLibraryCategory);  
router.get('/get/:userId/:category', getUserLibraryCategory);
router.get('/fetch/:userId', fetchLibraryState); 
router.patch('/patch/:userId/:audiobookId/:category', removeBookFromLibraryCategory); 

module.exports = router;