import React, { Component } from 'react';
import database from './firebase';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Waiting = (props) => {
  const gameID = props.gameID;
  const thisPlayer = props.thisPlayer;
  console.log(props)
  const players = Object.keys(props.playersObj);
  return (
    <div>
      <h2>Waiting Room</h2>
      <div>
        <h3>Players</h3>
        {
          players.length ?
            players.map(player => (<p key={player}>{player}</p>)) :
            <p>No Players in the Game</p>
        }
      </div>
      {
        thisPlayer ?
          <h3>Welcome {thisPlayer}</h3> :
          (
            <form onSubmit={props.savePlayer}>
              <input type="text" name="playerName" />
              <input type="submit" value="enter" />
            </form>
          )
      }
      <div>
        <h3>Invite your friendz!</h3>
        <p>{`localhost:3000/game/${gameID}`}</p>
        <CopyToClipboard text={`localhost:3000/game/${gameID}`}>
          <button>Copy to clipboard</button>
        </CopyToClipboard>
      </div>
      <button onClick={props.startGame}>
        Start Game
      </button>
    </div>
  )

}

export default Waiting;
