import React from 'react';
import {Route, Link} from 'react-router-dom';

import {PropsRoute} from '@lib/CustomRoutes';
import ApProj from './ApProj';
import GameProj from './GameProj';

export default (props) => {
  return (
    <div>
      <Route exact path={props.match.url} render={() => (
        <div>
          <h2>Projects</h2>
          <ul>
            <li>
              <Link to={`${props.match.url}/GameProj`}>
                Loopless game server experiment
              </Link>
            </li>
            <li>
              <Link to={`${props.match.url}/ApProj`}>
                Auslander-Parter algorithm
              </Link>
            </li>
          </ul>
        </div>
      )}/>
      <Route path={`${props.match.url}/ApProj`} component={ApProj}/>
      <PropsRoute profile={props.user.profile} path={`${props.match.url}/GameProj`} component={GameProj}/>
    </div>
  );
};
