import React, { useState, useRef } from 'react';
import { FaUserCircle } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import Notes from '../../components/Notes/Notes';
import TextToSpeech from '../../components/TextToSpeech/TextToSpeech';
import Summary from '../../components/Summary/Summary';
import SpeechToText from '../../components/SpeechToText/SpeechToText';
import FlashCards from '../../components/FlashCards/FlashCards';
import Library from '../Library/Library';
import LessonView from '../Library/LessonView';
import Profile from '../Profile/Profile';
import "./Dashboard.css";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('notes');
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dropdownRef = useRef(null);
  const { dispatch, user } = useAuthContext();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
    if (componentName !== 'library') {
      setSelectedLessonId(null);
    }
  }

  const handleLessonSelect = (lessonId) => {
    setSelectedLessonId(lessonId);
  };

  const handleBackToLibrary = () => {
    setSelectedLessonId(null);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const handleFeatureClick = (e) => {
    if (!user) {
      e.preventDefault();
      e.stopPropagation();
      setShowLoginModal(true);
    }
  };

  return (
    <div className='dashboard__page__container'>
      <div className='dashboard__header'>
        <h1>
          👋 {user ? `Welcome Back, ${user.name}` : 'DysCo'}
        </h1>

        <div className='dashboard__header__icons__container'>
          {user ? (
            <>
              <FaUserCircle className='dashboard__header__icons' onClick={toggleDropdown} />
              <div style={{ display: isOpen ? "block" : "none" }} className="user__dropdown" ref={dropdownRef} onClick={handleLogout}>
                Logout
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {showLoginModal && !user && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '9999'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '10px',
            textAlign: 'center',
            maxWidth: '500px'
          }}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Login Required</h2>
            <p style={{ marginBottom: '30px', color: '#666', fontSize: '16px' }}>
              You need to log in or create an account to use this feature.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: '12px 30px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                style={{
                  padding: '12px 30px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Register
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                style={{
                  padding: '12px 30px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='dashboard__page__main' onClick={handleFeatureClick}>
        <Sidebar handleButtonClick={handleButtonClick} />
        <div className='main__content__container'>
          {activeComponent === 'notes' && <Notes />}
          {activeComponent === 'stt' && <SpeechToText />}
          {activeComponent === 'summary' && <Summary />}
          {activeComponent === 'tts' && <TextToSpeech />}
          {activeComponent === 'cards' && <FlashCards />}
          {activeComponent === 'library' && (
            selectedLessonId ? (
              <LessonView lessonId={selectedLessonId} onBack={handleBackToLibrary} />
            ) : (
              <Library onSelectLesson={handleLessonSelect} />
            )
          )}
          {activeComponent === 'profile' && <Profile />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
