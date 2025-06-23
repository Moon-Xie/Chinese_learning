import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LevelSelector from './components/LevelSelector'
import StoryList from './components/StoryList'
import ReadingMode from './components/ReadingMode'
import Navbar from './components/Navbar'
import HomePage from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import SplashPage from './components/SplashPage'
import './App.css'

function AppContent() {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [selectedStory, setSelectedStory] = useState(null)
  const { currentUser } = useAuth()
  const navigate = useNavigate();

  const handleLevelSelect = (level) => {
    setSelectedLevel(level)
    setSelectedStory(null)
  }

  const handleStorySelect = (story) => {
    setSelectedStory(story)
  }

  const handleExitReading = () => {
    setSelectedStory(null)
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <div className="app">
        {currentUser ? (
          <div>
            {!selectedLevel && <LevelSelector onLevelSelect={handleLevelSelect} />}
            {selectedLevel && !selectedStory && (
              <StoryList
                selectedLevel={selectedLevel}
                onStorySelect={handleStorySelect}
              />
            )}
            {selectedStory && (
              <ReadingMode
                story={selectedStory}
                onExit={handleExitReading}
              />
            )}
          </div>
        ) : (
          <div>
            <h2>Please sign up or login to continue</h2>
            <Link to='/signup'>
              <button>Sign Up</button>
            </Link>
            <Link to='/login'>
              <button>Login</button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      {showSplash ? <SplashPage /> : <AppContent />}
    </AuthProvider>
  )
}

export default App
