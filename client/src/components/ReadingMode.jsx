import React, { useState, useEffect, useRef } from 'react';
import './ReadingMode.css';
import catStory from '../stories/catStory.json';

const wordsInStory = catStory.content.split(/\s+/);

// Helper to find the nth occurrence of a word
function findNthWordIndex(words, target, n = 1) {
  let count = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i].replace(/[.?!,]/g, '') === target) {
      count++;
      if (count === n) return i;
    }
  }
  return -1;
}

// Enhanced dummy story data with Chinese translations and HSK level-appropriate words
const dummyStory = {
  title: catStory.title,
  content: catStory.content,
  chineseContent: catStory.chineseContent,
  quizPoints: [
    {
      position: findNthWordIndex(wordsInStory, 'cat', 1) + 1, // 1-based
      english: 'cat',
      options: ['猫', '狗', '鸟'],
      correct: '猫',
      context: 'Once upon a time, there was a little ___.'
    },
    {
      position: findNthWordIndex(wordsInStory, 'garden', 1) + 1, // 1-based
      english: 'garden',
      options: ['花园', '房子', '学校'],
      correct: '花园',
      context: 'The cat loved to play in the ___.'
    },
    {
      position: findNthWordIndex(wordsInStory, 'butterfly', 1) + 1, // 1-based
      english: 'butterfly',
      options: ['蝴蝶', '蜜蜂', '蚂蚁'],
      correct: '蝴蝶',
      context: 'It saw a beautiful ___.'
    },
  ]
};

const ReadingMode = ({ story, onExit }) => {
  const words = dummyStory.content.split(' ');
  // Calculate the start and end character indices for each word
  const wordCharRanges = useRef([]);
  if (wordCharRanges.current.length === 0) {
    let idx = 0;
    for (let i = 0; i < words.length; i++) {
      const start = idx;
      const end = idx + words[i].length;
      wordCharRanges.current.push({ start, end });
      idx = end + 1; // +1 for the space
    }
  }

  const [charIndex, setCharIndex] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizWordIdx, setQuizWordIdx] = useState(null);
  const [goldCoins, setGoldCoins] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  // Find the next quiz point
  useEffect(() => {
    if (!isTyping) return;
    // Find if the next word is a quiz word and if we've reached its end
    for (let i = 0; i < dummyStory.quizPoints.length; i++) {
      const quiz = dummyStory.quizPoints[i];
      const wordIdx = quiz.position - 1;
      const range = wordCharRanges.current[wordIdx];
      if (range && charIndex === range.end) {
        setIsTyping(false);
        setCurrentQuiz(quiz);
        setQuizWordIdx(wordIdx);
        return;
      }
    }
    if (charIndex < dummyStory.content.length) {
      const timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [charIndex, isTyping]);

  const handleQuizAnswer = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQuiz?.correct;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      setGoldCoins((prev) => prev + 1);
    }
    setTimeout(() => {
      setShowFeedback(false);
      setCurrentQuiz(null);
      setSelectedAnswer('');
      setIsTyping(true);
      // Move charIndex past the quiz word and the following space
      const range = wordCharRanges.current[quizWordIdx];
      setCharIndex(range.end + 1);
      setQuizWordIdx(null);
    }, 1200);
  };

  // Render the story up to charIndex, replacing the quiz word with a dropdown if needed
  const renderTextWithQuiz = () => {
    if (currentQuiz && quizWordIdx !== null) {
      // Render up to the start of the quiz word
      const before = dummyStory.content.slice(0, wordCharRanges.current[quizWordIdx].start);
      // Render the dropdown in place of the quiz word
      return (
        <>
          <span>{before}</span>
          <span className="quiz-word-container">
            <select
              className={`quiz-select ${showFeedback ? (selectedAnswer === currentQuiz.correct ? 'correct' : 'incorrect') : ''}`}
              value={selectedAnswer}
              onChange={(e) => handleQuizAnswer(e.target.value)}
              disabled={showFeedback}
            >
              <option value="">{currentQuiz.english}</option>
              {currentQuiz.options.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
            {showFeedback && (
              <span className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                {isCorrect ? '✓' : '✗'}
              </span>
            )}
          </span>{' '}
        </>
      );
    } else {
      // Normal typing animation
      return (
        <>
          {dummyStory.content.slice(0, charIndex)}
          <span className="cursor">|</span>
        </>
      );
    }
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
          {renderTextWithQuiz()}
        </div>
      </div>
    </div>
  );
};

export default ReadingMode; 