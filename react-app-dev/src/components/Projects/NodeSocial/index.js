import React from 'react';
import Lobby from './Lobby';
import Game from './Game';
import {Route, Switch} from 'react-router-dom';

export default props => (
  <section>
    <Switch>
      <Route path={props.match.path} exact component={Lobby} />
      <Route path={`${props.match.path}/game`} component={Game} />
    </Switch>
  </section>
);
