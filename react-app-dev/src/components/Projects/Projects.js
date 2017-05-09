import React from 'react';
import {Route} from 'react-router-dom';

import {PropsRoute} from '@lib/CustomRoutes';
import ApProj from './ApProj';
import NbProj from './GameProj';
import ProjectThumbnails from '@components/ProjectThumbnails/ProjectThumbnails';

import text from '@styles/text.css';
import position from '@styles/position.css';

export default (props) => (
  <div>
    <Route exact path={props.match.url} render={() => (
      <div className={position.center}>
        <div className={`${text.title}`}>Projects</div>
        <ProjectThumbnails/>
      </div>
    )}/>
    <Route path={`${props.match.url}/ApProj`} component={ApProj}/>
    <PropsRoute profile={props.user.profile} path={`${props.match.url}/GameProj`} component={NbProj}/>
  </div>
);
