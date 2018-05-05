import React from 'react';

const Stats = (props) => {
  const playersObj = props.players;
  const players = Object.keys(playersObj);

  // find winner(s)
  let max = 0;
  for(let player in playersObj) {
    if(playersObj[player] > max) max = playersObj[player];
  }
  const winners = players.filter(player => playersObj[player] === max);
  return (
    <div id="stats">
      <h2>Congrats to the Winner, <span id="winner">{winners.join('/')}</span>!</h2>
      <table id="stats-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
        {
          players.map(player => (
            <tr>
              <td>{player}</td>
              <td>{playersObj[player]}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  )
}

export default Stats;
