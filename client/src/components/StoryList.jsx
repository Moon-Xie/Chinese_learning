import React from 'react';
import './StoryList.css';

// Dummy data for stories
const dummyStories = {
  1: [
    { id: 1, title: 'The Little Cat', difficulty: 'Easy', wordCount: 50 },
    { id: 2, title: 'My First Day at School', difficulty: 'Easy', wordCount: 75 },
    { id: 3, title: 'The Red Apple', difficulty: 'Easy', wordCount: 60 },
  ],
  2: [
    { id: 4, title: 'The Busy Market', difficulty: 'Medium', wordCount: 100 },
    { id: 5, title: 'A Day in the Park', difficulty: 'Medium', wordCount: 120 },
    { id: 6, title: 'The Lost Key', difficulty: 'Medium', wordCount: 90 },
  ],
  // Add more levels as needed
};

const StoryList = ({ selectedLevel, onStorySelect }) => {
  const stories = dummyStories[selectedLevel] || [];

  return (
    <div className="story-list">
      <h2>Stories for HSK Level {selectedLevel}</h2>
      <div className="stories-grid">
        {stories.map((story) => (
          <div
            key={story.id}
            className="story-card"
            onClick={() => onStorySelect(story)}
          >
            <h3>{story.title}</h3>
            <div className="story-info">
              <span className="difficulty">{story.difficulty}</span>
              <span className="word-count">{story.wordCount} words</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryList; 