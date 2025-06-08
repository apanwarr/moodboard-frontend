import React, { useEffect, useState } from 'react';

const MoodQuote = () => {

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetch('https://quotes-api-self.vercel.app/quote')
      .then(response => response.json())
      .then(data => {
        setQuote(data.quote);   
        setAuthor(data.author);  
      })
      .catch(error => {
        console.log(error);     
        setQuote('Keep your mood high!');  
        setAuthor('Unknown');            
      });
  }, []); 

  return (
    <div className="mb-6 p-4 border rounded shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">Mood Quote of the Day</h2>
      <p className="italic">"{quote}"</p>
      <p className="text-right mt-2">- {author}</p>
    </div>
  );
};

export default MoodQuote;
