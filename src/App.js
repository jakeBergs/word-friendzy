import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game';
import Test from './Test';

class App extends Component {
  render() {
    console.log(Game);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
