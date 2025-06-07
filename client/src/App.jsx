import React, { useState } from 'react'
import LevelSelector from './components/LevelSelector'
import StoryList from './components/StoryList'
import ReadingMode from './components/ReadingMode'
import './App.css'

function App() {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [selectedStory, setSelectedStory] = useState(null)

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
    <div className="app">
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
  )
}

export default App
