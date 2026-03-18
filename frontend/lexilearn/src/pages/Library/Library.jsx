import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Library.css'; // We'll create this css file
import toast from 'react-hot-toast';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const Library = ({ onSelectLesson }) => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorInfo, setErrorInfo] = useState('');

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                console.log("Fetching lessons from:", `${apiURL}/lessons`);
                const response = await axios.get(`${apiURL}/lessons`);
                console.log("Lessons response:", response.data);
                setLessons(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching lessons:", error);
                setErrorInfo(`${error.message} (URL: ${apiURL}/lessons)`);
                toast.error("Failed to load lessons");
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    return (
        <div className="library-container">
            <h1 className="library-title">Learning Library</h1>
            {errorInfo && (
                <div style={{ padding: '10px', background: '#ffe6e6', color: 'red', marginBottom: '10px', borderRadius: '5px' }}>
                    <strong>Debug Error:</strong> {errorInfo}
                </div>
            )}
            {!loading && !errorInfo && lessons.length === 0 && (
                <div style={{ padding: '10px', background: '#e6f7ff', color: '#0050b3', marginBottom: '10px', borderRadius: '5px' }}>
                    No lessons found. Connected to: {apiURL}
                </div>
            )}
            <div className="lessons-grid">
                {lessons.map((lesson) => (
                    <div key={lesson._id} className="lesson-card">
                        {lesson.image && <img src={lesson.image} alt={lesson.title} className="lesson-image" />}
                        <div className="lesson-content">
                            <span className={`difficulty-badge ${lesson.difficulty.toLowerCase()}`}>
                                {lesson.difficulty}
                            </span>
                            <h2 className="lesson-title">{lesson.title}</h2>
                            <p className="lesson-category">{lesson.category}</p>
                            <button
                                onClick={() => onSelectLesson(lesson._id)}
                                className="read-btn"
                                style={{ border: 'none', cursor: 'pointer', width: '100%', fontSize: '1rem' }}
                            >
                                Start Lesson
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Library;
