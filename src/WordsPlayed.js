import React from 'react';

const WordsPlayed = (props) => {
  const {words} = props;
  console.log(Object.keys(words))
  return (
    <div className="played-words">
      {
        Object.keys(words).map(word => (
          <div key={word}>{word}</div>
        ))
      }
    </div>
  )
}

export default WordsPlayed;
