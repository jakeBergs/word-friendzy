import React, { Component } from 'react';
import database from './firebase';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Waiting extends Component {
  constructor() {
    super()

    this.state = {
      players: {},
      thisPlayer: ''
    }

    this.savePlayer = this.savePlayer.bind(this)
  }

  componentDidMount() {
    const gameID = this.props.match.params.gameID;
    const playersRef = database.ref(`games/${gameID}/players`);
    playersRef.on('value', (snapshot) => {
      if(snapshot.val())
        this.setState({ players: snapshot.val() })
    })

  }

  savePlayer(event) {
    event.preventDefault();
    const name = event.target.playerName.value;
    if (name) {
      console.log('in');
      const gameID = this.props.match.params.gameID;
      let newPlayer = {};
      newPlayer[name] = 0;
      database.ref(`games/${gameID}/players`).update(newPlayer);
      this.setState({ thisPlayer: name })
    }
  }

  startGame(event) {
    event.preventDefault();
    const gameID = this.props.match.params.gameID;
    database.ref(`games/${gameID}`).set({
      status: 'playing'
    })



  }

  render() {
    const gameID = this.props.match.params.gameID;
    const players = Object.keys(this.state.players);
    const thisPlayer = this.state.thisPlayer;
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
              <form onSubmit={this.savePlayer}>
                <input type="text" name="playerName" />
                <input type="submit" value="enter" />
              </form>
            )
        }
        <div>
          <h3>Invite your friendz!</h3>
          <p>{`localhost:3000/pregame/${gameID}`}</p>
          <CopyToClipboard text={`localhost:3000/pregame/${gameID}`}>
            <button>Copy to clipboard</button>
          </CopyToClipboard>
        </div>
        <button>
          Start Game
        </button>
      </div>
    )
  }
}

export default Waiting;
