import React, { useState, useEffect } from 'react';
import './ReadingMode.css';

// Dummy story data
const dummyStory = {
  title: 'The Little Cat',
  content: 'Once upon a time, there was a little cat. The cat loved to play in the garden. One day, it saw a beautiful butterfly. The cat tried to catch the butterfly, but it flew away. The cat was sad, but then it found a ball of yarn. The cat played with the yarn all day long.',
  quizPoints: [
    { position: 3, options: ['猫', '狗', '鸟'], correct: '猫' },
    { position: 6, options: ['花园', '房子', '学校'], correct: '花园' },
    { position: 9, options: ['蝴蝶', '蜜蜂', '蚂蚁'], correct: '蝴蝶' },
  ]
};

const ReadingMode = ({ story, onExit }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentPosition, setCurrentPosition] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [goldCoins, setGoldCoins] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) return;

    const text = dummyStory.content;
    const typingSpeed = 50; // milliseconds per character

    if (currentPosition < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentPosition + 1));
        setCurrentPosition(currentPosition + 1);

        // Check if we should show a quiz
        const quizPoint = dummyStory.quizPoints.find(q => q.position === currentPosition + 1);
        if (quizPoint) {
          setIsTyping(false);
          setShowQuiz(true);
          setCurrentQuiz(quizPoint);
        }
      }, typingSpeed);

      return () => clearTimeout(timer);
    }
  }, [currentPosition, isTyping]);

  const handleQuizAnswer = (answer) => {
    if (answer === currentQuiz.correct) {
      setGoldCoins(prev => prev + 1);
    }
    setShowQuiz(false);
    setIsTyping(true);
  };

  return (
    <div className="reading-mode">
      <div className="reading-header">
        <button className="exit-button" onClick={onExit}>Exit</button>
        <div className="gold-display">
          <span className="gold-icon">🪙</span>
          <span className="gold-count">{goldCoins}</span>
        </div>
      </div>

      <div className="story-container">
        <h2>{dummyStory.title}</h2>
        <div className="story-content">
          {displayedText}
          <span className="cursor">|</span>
        </div>
      </div>

      {showQuiz && currentQuiz && (
        <div className="quiz-overlay">
          <div className="quiz-container">
            <h3>Choose the correct Chinese word:</h3>
            <div className="quiz-options">
              {currentQuiz.options.map((option, index) => (
                <button
                  key={index}
                  className="quiz-option"
                  onClick={() => handleQuizAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingMode; 