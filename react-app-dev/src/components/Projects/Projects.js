import React from 'react';
import {Route} from 'react-router-dom';
import RoomProj from './RoomProj';
import ApProj from './ApProj';
import NbProj from './GameProj';
import NodeSocial from 'node-social';
import ProjectThumbnails from '@components/ProjectThumbnails/ProjectThumbnails';
import {AuthRoute} from '@lib/CustomRoutes';
import {connect} from 'react-redux';

import text from '@styles/text.css';
import position from '@styles/position.css';



//temp
import {Link} from 'react-router-dom';

const Projects = props => {
  return (
    <div style={{height: '100%'}}>
      <Route exact path={props.match.path} render={() => (
        <div className={position.center}>
          <div className={`${text.title}`}>Projects</div>
          <ProjectThumbnails/>
        </div>
      )}/>
      <Route path={`${props.match.path}/Room`} component={RoomProj}/>
      <Route path={`${props.match.path}/ApProj`} component={ApProj}/>
      <Route path={`${props.match.path}/GameProj`} component={NbProj}/>
      <AuthRoute style={{padding: '0 40px 40px 40px'}} user={props.user} path={`${props.match.path}/NodeSocial`} component={NodeSocial}/>
    </div>
  );
};

function mapStateToProps(state){
  return {user: state.user};
}

export default connect(mapStateToProps)(Projects);


//<AuthRoute style={{marginTop: 100 + 'px'}} path={`${props.match.path}/NodeSocial`} component={NodeSocial}/>
