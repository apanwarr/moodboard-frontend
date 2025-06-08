import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import MoodSummary from './components/MoodSummary';
import MoodQuote from './components/MoodQuote';

const moods = {
  Happy: { color: 'bg-yellow-300', level: 2 },
  Neutral: { color: 'bg-gray-300', level: 1 },
  Sad: { color: 'bg-blue-300', level: -1 },
};

function App() {
  const [moodData, setMoodData] = useState(() => {
    const saved = localStorage.getItem('moodData');
    if (saved) {
      return JSON.parse(saved);
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem('moodData', JSON.stringify(moodData));
  }, [moodData]);

  function handleMoodChange(day, mood) {
    setMoodData(prevData => ({
      ...prevData,
      [day]: mood,
    }));
  }

  function getDominantMood() {
    const counts = {};
    Object.values(moodData).forEach(mood => {
      counts[mood] = (counts[mood] || 0) + 1;
    });

    if (Object.keys(counts).length === 0) return '';

    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  }

  const dominant = getDominantMood();
  const backgroundClass = dominant ? moods[dominant].color : 'bg-white';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${backgroundClass}`}>
      <div className="max-w-2xl mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">MoodBoard</h1>
        <MoodQuote />
        <Calendar moods={moods} moodData={moodData} onMoodChange={handleMoodChange} />
        <MoodSummary moods={moods} moodData={moodData} />
      </div>
    </div>
  );
}

export default App;
