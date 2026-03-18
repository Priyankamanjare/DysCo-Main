const Lesson = require('../models/lessonModel');

const getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find({});
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (lesson) {
            res.status(200).json(lesson);
        } else {
            res.status(404).json({ message: 'Lesson not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createLesson = async (req, res) => {
    try {
        const { title, content, difficulty, category, quiz } = req.body;

        // Basic validation
        if (!title || !content || !category) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const lesson = new Lesson({
            title,
            content,
            difficulty,
            category,
            quiz
        });

        const createdLesson = await lesson.save();
        res.status(201).json(createdLesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getLessons,
    getLessonById,
    createLesson
};
