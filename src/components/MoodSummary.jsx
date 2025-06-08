import React from 'react';

const MoodSummary = ({ moods, moodData }) => {
  const validMoods = Object.values(moodData).filter(mood => mood && moods.hasOwnProperty(mood));

  const counts = {};
  validMoods.forEach(mood => {
    counts[mood] = (counts[mood] || 0) + 1;
  });

  let dominant = '';
  if (validMoods.length > 0) {
    dominant = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  }

  const goodDays = counts['Happy'] || 0;
  const badDays = counts['Sad'] || 0;

  return (
    <div style={{
      padding: '16px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      backgroundColor: 'white',
      boxShadow: '0 0 5px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Mood Summary</h2>

      <p>
        Most common mood:{' '}
        {dominant ? (
          <span style={{ color: moods[dominant].color, fontWeight: 'bold' }}>{dominant}</span>
        ) : 'None'}
      </p>
      <p>Good mood days: {goodDays}</p>
      <p>Bad mood days: {badDays}</p>

      <div style={{ display: 'flex', marginTop: '16px', gap: '16px', justifyContent: 'center' }}>
        {Object.keys(moods).map(mood => {
          const count = counts[mood] || 0;
          const percentage = validMoods.length > 0 ? (count / validMoods.length) * 100 : 0;

          return (
            <div key={mood} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '14px', marginBottom: '4px' }}>{Math.round(percentage)}%</div>
              <div
                style={{
                  height: '16px',
                  backgroundColor: moods[mood].color,
                  width: `${percentage}%`,
                  margin: '0 auto',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease',
                  maxWidth: '80%',
                  opacity: percentage > 0 ? 1 : 0.3,
                }}
              ></div>

              <div style={{ marginTop: '6px', fontSize: '12px' }}>{mood}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoodSummary;
