import React from 'react';
import './LevelSelector.css';

const LevelSelector = ({ onLevelSelect }) => {
  const hskLevels = [
    { level: 1, description: 'Basic - 150 words' },
    { level: 2, description: 'Elementary - 300 words' },
    { level: 3, description: 'Intermediate - 600 words' },
    { level: 4, description: 'Upper Intermediate - 1200 words' },
    { level: 5, description: 'Advanced - 2500 words' },
    { level: 6, description: 'Mastery - 5000 words' },
  ];

  return (
    <div className="level-selector">
      <h1>Choose Your HSK Level</h1>
      <div className="level-grid">
        {hskLevels.map(({ level, description }) => (
          <button
            key={level}
            className="level-button"
            onClick={() => onLevelSelect(level)}
          >
            <h2>HSK {level}</h2>
            <p>{description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector; 