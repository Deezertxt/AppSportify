const express = require("express");
const router = express.Router();
const { createUser, deleteUser, getUserById, updateUser } = require("../controller/userController");

router.post('/register', createUser);
router.delete('/delete/:id', deleteUser);
router.get('/get/:id',getUserById);
router.put('/put/:id',updateUser);

module.exports = router;