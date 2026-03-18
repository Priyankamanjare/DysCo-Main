import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../hooks/useAuthContext';
import './LessonView.css';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const LessonView = ({ lessonId, onBack }) => {
    // const { id } = useParams(); // Removed
    const navigate = useNavigate();
    const { user } = useAuthContext();

    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(null);

    // Quiz state
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`${apiURL}/lessons/${lessonId}`);
                setLesson(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching lesson:", error);
                toast.error("Failed to load lesson");
                onBack(); // Go back on error
            }
        };
        if (lessonId) {
            fetchLesson();
        }
    }, [lessonId]);

    const handleSummarize = async () => {
        if (!user) return toast.error("Please login to use summary");
        setIsSummarizing(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.accessToken}` } };
            const response = await axios.post(`${apiURL}/summary`, { text: lesson.content }, config);
            setSummary(response.data.summary);
            toast.success("Summary generated!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Summary failed");
        } finally {
            setIsSummarizing(false);
        }
    };

    const handleSpeak = async () => {
        if (isPlaying && audio) {
            audio.pause();
            setIsPlaying(false);
            return;
        }

        if (!user) return toast.error("Please login to listen");

        const toastId = toast.loading("Generating audio...");
        try {
            const config = { headers: { Authorization: `Bearer ${user.accessToken}` } };
            const response = await axios.post(`${apiURL}/texttospeech`, { text: lesson.content }, config);

            const newAudio = new Audio(response.data.audio);
            newAudio.onended = () => setIsPlaying(false);
            setAudio(newAudio);
            newAudio.play();
            setIsPlaying(true);
            toast.dismiss(toastId);
        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Failed to generate speech");
        }
    };

    const handleAnswer = (optionIndex) => {
        if (optionIndex === lesson.quiz[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < lesson.quiz.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    useEffect(() => {
        const saveProgress = async () => {
            if (showScore && user) {
                try {
                    const config = { headers: { Authorization: `Bearer ${user.accessToken}` } };
                    await axios.post(`${apiURL}/user/progress`, {
                        lessonId: lesson._id,
                        score: score
                    }, config);
                    toast.success("Progress saved!");
                } catch (error) {
                    console.error("Error saving progress:", error);
                }
            }
        };
        saveProgress();
    }, [showScore, user, lesson, score]);

    if (loading) return <div className="loading-spinner">Loading Lesson...</div>;

    return (
        <div className="lesson-view-container">
            <button className="back-btn" onClick={onBack}>← Back to Library</button>

            <div className="lesson-header">
                <h1>{lesson.title}</h1>
                <div className="lesson-meta">
                    <span className={`badge ${lesson.difficulty.toLowerCase()}`}>{lesson.difficulty}</span>
                    <span className="category">{lesson.category}</span>
                </div>
            </div>

            <div className="lesson-actions">
                <button
                    className={`action-btn speak-btn ${isPlaying ? 'playing' : ''}`}
                    onClick={handleSpeak}
                >
                    {isPlaying ? '⏸ Stop Reading' : '🔊 Read Aloud'}
                </button>
                <button
                    className="action-btn summary-btn"
                    onClick={handleSummarize}
                    disabled={isSummarizing}
                >
                    {isSummarizing ? 'Thinking...' : '📝 Summarize'}
                </button>
                <button className="action-btn quiz-btn" onClick={() => setShowQuiz(true)}>
                    🧠 Take Quiz
                </button>
            </div>

            {summary && (
                <div className="summary-box">
                    <h3>Lesson Summary</h3>
                    <p>{summary}</p>
                </div>
            )}

            <div className="lesson-body">
                <p>{lesson.content}</p>
            </div>

            {/* Basic Quiz Modal/Overlay */}
            {showQuiz && (
                <div className="quiz-overlay">
                    <div className="quiz-modal">
                        <button className="close-quiz" onClick={() => { setShowQuiz(false); setShowScore(false); setScore(0); setCurrentQuestion(0); }}>✕</button>

                        {showScore ? (
                            <div className="score-section">
                                <h2>Quiz Complete!</h2>
                                <p>You scored {score} out of {lesson.quiz.length}</p>
                                <button onClick={() => { setShowQuiz(false); setShowScore(false); setScore(0); setCurrentQuestion(0); }}>Close</button>
                            </div>
                        ) : (
                            <div className="question-section">
                                <h2>Question {currentQuestion + 1}/{lesson.quiz.length}</h2>
                                <p>{lesson.quiz[currentQuestion].question}</p>
                                <div className="options-grid">
                                    {lesson.quiz[currentQuestion].options.map((option, index) => (
                                        <button key={index} onClick={() => handleAnswer(index)} className="option-btn">
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LessonView;
