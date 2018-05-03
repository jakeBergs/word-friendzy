import React, {Component} from 'react';
import AddWords from './AddWords';

class Test extends Component {
  constructor() {
    super()

    this.state = {
      letters: { a: 1, m: 2, g: 1, e: 1, j: 1, y: 1, s: 2},
      lettersRemaining: { a: 1, m: 2, g: 1, e: 1, j: 1, y: 1, s: 2},
      words: [],
      currWord: ''
    }
    this.updateCurr = this.updateCurr.bind(this)
  }

  updateCurr(event) {
    event.preventDefault();
    console.log(event.target.value);
    this.setState({currWord: event.target.value})
  }

  render() {return (
    <div>
      This is a fucking test
    </div>
  )}
}

export default Test;
