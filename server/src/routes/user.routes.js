const express = require("express");
const router = express.Router();
const { registerOrLoginWithGoogle,createUser, deleteUser, getUserById, getUserByEmail, updateUser, toggleProfilePrivacy } = require("../controller/userController");

router.post('/registergoogle', registerOrLoginWithGoogle);
router.post('/register', createUser);
router.delete('/delete/:id', deleteUser);
router.get('/get/:id',getUserById);
router.get('/getemail/:email',getUserByEmail);
router.put('/put/:id',updateUser);
router.patch('/privacy/:id', toggleProfilePrivacy);

module.exports = router;