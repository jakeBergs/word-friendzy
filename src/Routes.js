import React from 'react';
import {Route, Switch} from 'react-router-dom';
import App from './App';
import Game from './Game';
import Home from './Home';

const Routes = (props) => {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/game/:gameID" component={Game} />
    </Switch>
  )
}

export default Routes;
