const express = require('express')
const router = express.Router();
const userRoutes = require('../routes/user.routes')
const audiobookRoutes = require('../routes/audiobook.routes')
const libraryRoutes = require('../routes/library.routes')
const categoryRoutes = require('../routes/category.routes')


router.use('/api/user', userRoutes);
router.use('/api/audiobook',audiobookRoutes);
router.use('/api/library', libraryRoutes);
router.use('/api/category', categoryRoutes);


module.exports = router;