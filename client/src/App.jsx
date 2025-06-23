import React, { useState } from 'react'
import { Routes, Route, useNavigate,Link } from 'react-router-dom'
import LevelSelector from './components/LevelSelector'
import StoryList from './components/StoryList'
import ReadingMode from './components/ReadingMode'
import Navbar from './components/Navbar'
import HomePage from './components/Home'
import Signup from './components/Signup'
import './App.css'

function App() {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [selectedStory, setSelectedStory] = useState(null)
  const [welcomeToggle, setWelcomeToggle] = useState(false)
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
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
      
      <div className="app">
        {!welcomeToggle && (
          <div>
            <h1>Welcome to your language learning trip!</h1>
            <Link to='/signup'>
              <button>Sign Up</button>
            </Link>
            <button onClick={handleWelcomeToggle}>Let's give it a try</button>
          </div>
        )}

        {welcomeToggle && (
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

export default App
