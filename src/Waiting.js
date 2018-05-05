import React, { Component } from 'react';
import database from './firebase';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Waiting = (props) => {
  const gameID = props.gameID;
  const thisPlayer = props.thisPlayer;
  console.log(props)
  const players = Object.keys(props.playersObj);
  return (
    <div id="waiting">
      <h2>Waiting Room</h2>
      <div id="player-info">
        {
          thisPlayer ?
            <h3>Welcome {thisPlayer}</h3> :
            (
              <div>
                <h4>Join The Game</h4>
                <form onSubmit={props.savePlayer}>
                  <input className="input-text" type="text" name="playerName" />
                  <input className="input-button" type="submit" value="Join" />
                </form>
              </div>
            )
        }
        <div id="players-waiting">
          <h3>Players</h3>
          {
            players.length ?
              players.map(player => (<p key={player} className="player-joined">{player}</p>)) :
              <p>No Players in the Game</p>
          }
        </div>
      </div>
      <h3>Invite your friendz!</h3>
      <div id="invite-link">
        <p>{`localhost:3000/game/${gameID}`}</p>
        <CopyToClipboard text={`localhost:3000/game/${gameID}`}>
          <button>Copy to clipboard</button>
        </CopyToClipboard>
      </div>
      <button id="start-game-btn" className="wf-btn" onClick={props.startGame}>
        Start Game
      </button>
    </div>
  )

}

export default Waiting;
