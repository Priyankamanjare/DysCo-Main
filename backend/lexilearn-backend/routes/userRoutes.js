
const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProgress } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile)
router.post("/progress", authMiddleware, updateUserProgress);

module.exports = router;