import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import toast from 'react-hot-toast';
import './Profile.css';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
    const { user } = useAuthContext();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            try {
                const config = { headers: { Authorization: `Bearer ${user.accessToken}` } };
                const response = await axios.get(`${apiURL}/user/profile`, config);
                setProfile(response.data.user);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile:", error);
                toast.error("Failed to load profile");
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    if (!user) return <div className="profile-container">Please login to view profile.</div>;
    if (loading) return <div className="loading-spinner">Loading Profile...</div>;

    return (
        <div className="profile-container">
            <h1 className="profile-title">My Profile</h1>

            <div className="profile-header">
                <div className="avatar-placeholder">{user.name.charAt(0).toUpperCase()}</div>
                <div className="user-info">
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            </div>

            <div className="progress-section">
                <h3>Learning Progress</h3>
                {profile && profile.progress && profile.progress.length > 0 ? (
                    <div className="progress-list">
                        {profile.progress.map((item, index) => (
                            <div key={index} className="progress-card">
                                <div className="progress-info">
                                    <h4>{item.lessonId?.title || "Unknown Lesson"}</h4>
                                    <p className="category">{item.lessonId?.category}</p>
                                </div>
                                <div className="progress-score">
                                    <span className="score-label">Quiz Score</span>
                                    <span className="score-value">{item.score}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-progress">No lessons completed yet. Go to the Library to start learning!</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
