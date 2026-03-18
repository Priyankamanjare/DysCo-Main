const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Lesson = require('../models/lessonModel');
const connectDB = require('../config/connectDB');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const sampleLessons = [
    {
        title: "Understanding Dyslexia",
        content: "Dyslexia is a learning disorder that involves difficulty reading due to problems identifying speech sounds and learning how they relate to letters and words (decoding). Also called reading disability, dyslexia affects areas of the brain that process language. People with dyslexia have normal intelligence and usually have normal vision. Most children with dyslexia can succeed in school with tutoring or a specialized education program. Emotional support also plays an important role.",
        difficulty: "Easy",
        category: "Education",
        image: "/images/lessons/dyslexia.jpg",
        quiz: [
            {
                question: "What is the primary difficulty associated with dyslexia?",
                options: ["Walking", "Reading", "Hearing", "Sleeping"],
                correctAnswer: 1
            },
            {
                question: "Dyslexia is related to: ",
                options: ["Vision problems", "Low intelligence", "Brain language processing", "Lack of effort"],
                correctAnswer: 2
            }
        ]
    },
    {
        title: "Phonemic Awareness",
        content: "Phonemic awareness is the ability to hear, identify, and manipulate individual sounds-phonemes-in spoken words. Before children learn to read print, they need to become aware of how the sounds in words work. They must understand that words are made up of speech sounds, or phonemes. For example, the word 'cat' is made up of three sounds: /c/ /a/ /t/. This is a critical skill for reading success.",
        difficulty: "Medium",
        category: "Reading Skills",
        image: "/images/lessons/phonemics.webp",
        quiz: [
            {
                question: "What is a phoneme?",
                options: ["A letter", "An individual sound in a spoken word", "A sentence", "A book"],
                correctAnswer: 1
            },
            {
                question: "The word 'cat' has how many phonemes?",
                options: ["1", "2", "3", "4"],
                correctAnswer: 2
            }
        ]
    },
    {
        title: "Strategies for Better Reading",
        content: "Improving reading skills takes practice. Here are some strategies: 1. Read aloud to improve fluency. 2. Use a ruler or finger to follow along with the text. 3. Break long new words into smaller chunks. 4. Listen to audiobooks while following the text. 5. Summarize what you read after each paragraph. These simple steps can build confidence and comprehension over time.",
        difficulty: "Easy",
        category: "Tips & Tricks",
        image: "/images/lessons/reading_tips.jpg",
        quiz: [
            {
                question: "Which tool can help follow along with text?",
                options: ["A calculator", "A ruler or finger", "A camera", "Headphones only"],
                correctAnswer: 1
            },
            {
                question: "What should you do after reading a paragraph?",
                options: ["Skip the next one", "Stop reading", "Summarize it", "Memorize it perfectly"],
                correctAnswer: 2
            }
        ]
    }
];

const seedDB = async () => {
    try {
        await connectDB();
        await Lesson.deleteMany({}); // Clear existing lessons
        await Lesson.insertMany(sampleLessons);
        console.log("Database seeded with sample lessons!");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
