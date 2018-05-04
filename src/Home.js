import React from 'react';
import {createGame} from './firebase';

const Home = (props) => {
  const gameCreator = (event) => {
    event.preventDefault();
    const gameID = createGame();
    props.history.push(`/game/${gameID}`)
  }

  return (
    <div>
      <h1>Word Friendzy</h1>
      <button onClick={gameCreator}>
        New Game
      </button>
    </div>
  )
}

export default Home;
