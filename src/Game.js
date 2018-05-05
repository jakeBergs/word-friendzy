import React, { Component } from 'react';
import AddWords from './AddWords';
import WordsPlayed from './WordsPlayed';
import database from './firebase';
import Waiting from './Waiting';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      letters: {},
      lettersRemaining: {},
      words: {},
      currWord: '',
      players: {},
      thisPlayer: '',
      status: ''
    };

    this.savePlayer = this.savePlayer.bind(this);
    this.startGame = this.startGame.bind(this);
    this.updateCurr = this.updateCurr.bind(this);
    this.saveWord = this.saveWord.bind(this);
  }

  componentDidMount() {
    const gameID = this.props.match.params.gameID;
    const playersRef = database.ref(`games/${gameID}/players`);

    playersRef.on('value', (snapshot) => {
      if (snapshot.val())
        this.setState({ players: snapshot.val() })
    })

    // load all the letters
    database.ref(`games/${gameID}/letters`).once('value').then(snapshot => {
      console.log(snapshot.val())
      this.setState({ letters: snapshot.val(), lettersRemaining: snapshot.val() })
    })
    // set listener for words
    const wordsRef = database.ref(`games/${gameID}/words`);
    wordsRef.on('value', (snapshot) => {
      this.setState({ words: snapshot.val() || {} })
    })

    // set listener for game status
    const statusRef = database.ref(`games/${gameID}/status`)
    statusRef.on('value', (snapshot) => {
      console.log(snapshot.val())
      this.setState({ status: snapshot.val() })
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

  // player starts the game
  startGame(event) {
    event.preventDefault()
    const gameID = this.props.match.params.gameID;

    // set game status
    database.ref(`games/${gameID}`).update({
      status: 'playing'
    })
  }

  updateCurr(event) {

    event.preventDefault();
    let { lettersRemaining } = this.state;
    const { letters, currWord } = this.state;
    const updatedWord = event.target.value;
    console.log(letters)
    // all letters have been deleted. have all letters available
    if (!updatedWord.length) {
      this.setState({ lettersRemaining: Object.assign({}, letters), currWord: '' })
      return;
    }
    const addLetter = updatedWord.length > currWord.length;
    let lastLetter;
    if (addLetter) {
      lastLetter = updatedWord.slice(-1)
      // confirm that is one of the remaining letters
      if (lettersRemaining[lastLetter]) {
        lettersRemaining[lastLetter]--;
        this.setState({ lettersRemaining, currWord: updatedWord });
      }
    } else {

      lastLetter = currWord.slice(-1);
      lettersRemaining[lastLetter]++;
      this.setState({ lettersRemaining, currWord: updatedWord });
    }
  }

  saveWord(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const { currWord, words, letters } = this.state;
      if (!words[currWord]) {
        this.setState({ lettersRemaining: Object.assign({}, letters), currWord: '' })
        // save word to firebase
        const gameID = this.props.match.params.gameID;
        const newEntry = {};
        newEntry[currWord] = 'player1';
        database.ref(`games/${gameID}/words`).update(newEntry);
      }
    }
  }

  render() {
    const gameID = this.props.match.params.gameID;
    const { lettersRemaining, currWord, words, status, players, thisPlayer } = this.state;
    console.log(thisPlayer)
    return (
      <div>
        {
          status === 'playing' ?
            <div>
              <WordsPlayed words={words} />
              <AddWords lettersRemaining={lettersRemaining} currWord={currWord} editWord={this.updateCurr} saveWord={this.saveWord} />
            </div> : ''
        }
        {
          status === 'waiting' ?
            <Waiting playersObj={players} thisPlayer={thisPlayer} gameID={gameID} savePlayer={this.savePlayer} startGame={this.startGame} /> : ''
        }
      </div>
    )
  }
}

export default Game;
