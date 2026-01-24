const express = require('express');
const { summarizeText } = require('../controllers/summaryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/", authMiddleware, summarizeText);

module.exports = router;
