import React from 'react';
import {Route} from 'react-router-dom';
import text from '@styles/text.css';
import position from '@styles/position.css';
import {NavLink} from 'react-router-dom';

import Summary from './Description';
import Samples from './Samples';
import ApiDocs from './ApiDocs';

import './RoomProj.css';

export default props => (
  <div style={{height: '100%'}} className="container">
    <Route path={props.match.path} render={() => (
      <div className={position.center}>
        <NavLink exact className="nav-tab" to={props.match.path}>Summary</NavLink>
        <NavLink className="nav-tab" to={`${props.match.path}/Samples`}>Samples</NavLink>
        <NavLink className="nav-tab" to={`${props.match.path}/ApiDocs`}>API Docs</NavLink>
      </div>
    )}/>
    <Route exact path={`${props.match.path}`} component={Summary}/>
    <Route path={`${props.match.path}/Samples`} component={Samples}/>
    <Route path={`${props.match.path}/ApiDocs`} component={ApiDocs}/>
  </div>
);
