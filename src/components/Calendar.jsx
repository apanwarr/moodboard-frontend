import React from 'react';

const getPastWeekDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
};

const Calendar = ({ moods, moodData = {}, onMoodChange }) => {

  const weekDates = getPastWeekDates();

  return (
    <div className="grid grid-cols-3 gap-2 mb-6">
      {weekDates.map((date) => (
        <div
          key={date}
          className="p-2 border rounded shadow bg-white flex flex-col justify-between h-full"
        >
          <p className="text-sm mb-2">{date}</p>

          <div className="flex-1">
            {Object.keys(moods).map((mood) => {
              const isActive = moodData[date] === mood;

              return (
                <button
                  key={mood}
                  onClick={() => {
                    if (!isActive) onMoodChange(date, mood);
                  }}

                  className={`block w-full mb-1 p-1 rounded transition-colors duration-200 border ${
                    isActive
                      ? `${moods[mood].color} border-black`
                      : 'bg-gray-100 border-transparent'
                  } hover:opacity-80`}
                >
                  {mood}
                </button>
              );
            })}
          </div>

          {moodData[date] && (
            <button
              onClick={() => onMoodChange(date, undefined)} 
              className="text-xs text-red-500 mt-1 hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
