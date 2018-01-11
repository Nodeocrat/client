import React from 'react';
import Lobby from './Lobby';
import Game from './Game';
import {Provider} from 'react-redux';
import store from './store';
import {Route, Switch} from 'react-router-dom';

export default props => (
  <section>
    <Provider store={store}>
      <Switch>
        <Route path={props.match.path} exact component={Lobby} />
        <Route path={`${props.match.path}/game`} component={Game} />
      </Switch>
    </Provider>
  </section>
);
