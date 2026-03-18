const express = require('express');
const { getLessons, getLessonById, createLesson } = require('../controllers/lessonController');
// const authMiddleware = require('../middlewares/authMiddleware'); // Optional: Add auth if needed

const router = express.Router();

router.get('/', getLessons);
router.get('/:id', getLessonById);
router.post('/', createLesson); // For seeding/admin use

module.exports = router;
