import React, { Component } from 'react';
import AddWords from './AddWords';
import WordsPlayed from './WordsPlayed';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      letters: { a: 1, m: 2, g: 1, e: 1, j: 1, y: 1, s: 2 },
      lettersRemaining: { a: 1, m: 2, g: 1, e: 1, j: 1, y: 1, s: 2 },
      words: {},
      currWord: ''
    };

    this.updateCurr = this.updateCurr.bind(this);
    this.saveWord = this.saveWord.bind(this);
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
        let newWordList = Object.assign({}, words);
        newWordList[currWord] = 1;
        this.setState({ words: newWordList, lettersRemaining: Object.assign({}, letters), currWord: '' });
      }
    }
  }

  render() {
    const { lettersRemaining, currWord, words } = this.state;
    return (
      <div>
        <WordsPlayed words={words}/>
        <AddWords lettersRemaining={lettersRemaining} currWord={currWord} editWord={this.updateCurr} saveWord={this.saveWord} />
      </div>
    )
  }
}

export default Game;
