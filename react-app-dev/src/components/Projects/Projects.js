import React from 'react';
import {Route} from 'react-router-dom';
import ApProj from './ApProj';
import NbProj from './GameProj';
import NodeSocial from './NodeSocial/NodeSocial.js';
import ProjectThumbnails from '@components/ProjectThumbnails/ProjectThumbnails';
import {AuthRoute} from '@lib/CustomRoutes';

import text from '@styles/text.css';
import position from '@styles/position.css';



//temp
import {Link} from 'react-router-dom';

export default props => {
  return (
    <div>
      <Route exact path={props.match.url} render={() => (
        <div className={position.center}>
          <div className={`${text.title}`}>Projects</div>
          <ProjectThumbnails/>
          <Link to={`projects/NodeSocial`}><u>NodeSocial</u></Link>
        </div>
      )}/>
      <Route path={`${props.match.url}/ApProj`} component={ApProj}/>
      <Route path={`${props.match.url}/GameProj`} component={NbProj}/>
      <AuthRoute style={{marginTop: 100 + 'px'}} path={`${props.match.url}/NodeSocial`} component={NodeSocial}/>
    </div>
  );
};
