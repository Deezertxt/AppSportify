const express = require("express");
const router = express.Router();
const { registerOrLoginWithGoogle,createUser, deleteUser, getUserById, updateUser } = require("../controller/userController");

router.post('/registergoogle', registerOrLoginWithGoogle);
router.post('/register', createUser);
router.delete('/delete/:id', deleteUser);
router.get('/get/:id',getUserById);
router.put('/put/:id',updateUser);

module.exports = router;