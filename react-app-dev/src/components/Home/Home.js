import React from 'react';
import Summary from './Summary/Summary';
import {ProjectThumbnailsMini} from '@components/ProjectThumbnails/ProjectThumbnails';
import './Home.css';

import {Link} from 'react-router-dom';
import Center from '@lib/Center';

import awsLogo from '@media/aws-logo.png';
import linuxLogo from '@media/linux-logo.png';
import reactLogo from '@media/react-logo.png';
import mongoLogo from '@media/mongodb-logo.png';
import nodeLogo from '@media/node-logo.png';

import text from '@styles/text.css';

const Logos = () => (
  <div className="well" style={{backgroundColor: '#eeeeee'}}>
    <div className={`${text.small} ${text.center}`}>This site has been built using:</div>
    <Center>
        <img alt="logo" className="horizontal-img ext-logo-homepage" height="62" width="100" src={nodeLogo}></img>
        <img alt="logo" className="horizontal-img ext-logo-homepage" height="37" width="110" src={reactLogo}></img>
        <img alt="logo" className="horizontal-img ext-logo-homepage" height="37" width="100" src={awsLogo}></img>
        <img alt="logo" className="horizontal-img ext-logo-homepage" height="59" width="50" src={linuxLogo}></img>
        <img alt="logo" className="horizontal-img ext-logo-homepage" height="30" width="110" style={{marginTop: 40 + 'px'}} src={mongoLogo}></img>
    </Center>
  </div>
);

/*const Updates = () => (
  <Panel header="Updates">Updates</Panel>
);*/

const ProjectSummary = () => (
  <div className="panel panel-default">
    <div className="panel-heading panel-title">
      Projects
    </div>
    <div className="panel-body panel-text">
      <Center><ProjectThumbnailsMini/></Center>
    </div>
  </div>
);

const Contact = () => (
  <div className="panel panel-default">
      <div className="panel-heading panel-title">
        Contact
      </div>
      <div className="panel-body panel-text">
        ashley.phillips@nodeocrat.com
        <br/><a href="https://www.linkedin.com/in/ashley-phillips-5b5a8599/">linkedin</a>
      </div>
  </div>
);

export default (props) => {
  return (
    <div>
      <div className="col-sm-12">
        <Summary/>
      </div>
      <div className="col-sm-6">
        <ProjectSummary/>
      </div>
      <div className="col-sm-6">
        <Contact/>
      </div>
      <div className="col-sm-12 visible-lg visible-md hidden-sm hidden-xs">
        <Logos/>
      </div>
    </div>
  );
}
