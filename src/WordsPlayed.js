import React from 'react';

const WordsPlayed = (props) => {
  const {words} = props;
    return (
    <div id="played-words">
      {
        words === {} ? '' :
        Object.keys(words).map(word => (
          <div className="played-word" key={word}>{word}</div>
        ))
      }
    </div>
  )
}

export default WordsPlayed;
