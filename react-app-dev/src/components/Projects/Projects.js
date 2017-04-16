import React from 'react';
import {Route} from 'react-router-dom';

import {PropsRoute} from '@lib/CustomRoutes';
import ApProj from './ApProj';
import NbProj from './GameProj';
import Center from '@lib/Center';
import ProjectThumbnails from '@components/ProjectThumbnails/ProjectThumbnails';

import text from '@styles/text.css';

export default (props) => (
  <div>
    <Route exact path={props.match.url} render={() => (
      <div>
        <div className={`${text.center} ${text.title}`}>Projects</div>
          <Center>
            <ProjectThumbnails/>
          </Center>
      </div>
    )}/>
    <Route path={`${props.match.url}/ApProj`} component={ApProj}/>
    <PropsRoute profile={props.user.profile} path={`${props.match.url}/GameProj`} component={NbProj}/>
  </div>
);
