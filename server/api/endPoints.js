import express from 'express';
import userRoutes from '../routes/user.routes.js';
import audiobookRoutes from '../routes/audiobook.routes.js';
import libraryRoutes from '../routes/library.routes.js'
import categoryRoutes from '../routes/category.routes.js'
//const express = require('express')
const router = express.Router();
//const userRoutes = require('../routes/user.routes')
//const audiobookRoutes = require('../routes/audiobook.routes')
//const libraryRoutes = require('../routes/library.routes')
//const categoryRoutes = require('../routes/category.routes')


router.use('/api/user', userRoutes);
router.use('/api/audiobook',audiobookRoutes);
router.use('/api/library', libraryRoutes);
router.use('/api/category', categoryRoutes);


//module.exports = router;
export default router;