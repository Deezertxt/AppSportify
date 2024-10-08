import express from 'express';
//const express = require("express");
const router = express.Router();
import { createUser, deleteUser, getUserById, updateUser } from '../controllers/userController.js'

router.post('/register', createUser);
router.delete('/delete/:id', deleteUser);
router.get('/get/:id',getUserById);
router.put('/put/:id',updateUser);

//module.exports = router;
export default router;