const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Lesson = require('./models/lessonModel');
const connectDB = require('./config/connectDB');
const path = require('path');

dotenv.config();

const checkLessons = async () => {
    try {
        await connectDB();
        const count = await Lesson.countDocuments();
        console.log(`Total Lessons in DB: ${count}`);

        if (count > 0) {
            const lessons = await Lesson.find({});
            console.log('Sample Lesson:', JSON.stringify(lessons[0], null, 2));
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkLessons();
