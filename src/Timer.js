import React, { Component } from 'react';
import database from './firebase'

class Timer extends Component {
  constructor() {
    super()

    this.state = {
      timer: null,
      counter: 30
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });
  }
  tick() {
    if (this.state.counter <= 1) {
      window.clearInterval(this.state.timer)
      database.ref(`games/${this.props.gameID}`).update({
        status: 'finished'
      })
    } else {
      this.setState({
        counter: this.state.counter - 1
      });
    }

  }
  render() {
    return (
      <div>{this.state.counter}</div>
    )
  }
}

export default Timer;
