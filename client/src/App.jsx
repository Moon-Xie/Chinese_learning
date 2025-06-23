import React, { useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LevelSelector from './components/LevelSelector'
import StoryList from './components/StoryList'
import ReadingMode from './components/ReadingMode'
import Navbar from './components/Navbar'
import HomePage from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import './App.css'

function AppContent() {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [selectedStory, setSelectedStory] = useState(null)
  const [welcomeToggle, setWelcomeToggle] = useState(false)
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

  setTimeout(() => {
    setWelcomeToggle(true)
  }, 10000000);

  const handleWelcomeToggle = () => {
    setWelcomeToggle(true)
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
        {!currentUser && !welcomeToggle && (
          <div>
            <h1>Welcome to your language learning trip!</h1>
            <Link to='/signup'>
              <button>Sign Up</button>
            </Link>
            <Link to='/login'>
              <button>Login</button>
            </Link>
            <button onClick={handleWelcomeToggle}>Let's give it a try</button>
          </div>
        )}

        {!currentUser && welcomeToggle && (
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

        {currentUser && (
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
        )}

      </div>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
