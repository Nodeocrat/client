import React from 'react';
import Summary from './Summary/Summary';
import Brief from './Brief/Brief';
import {ProjectThumbnailsMini} from '@components/ProjectThumbnails/ProjectThumbnails';
import './Home.css';
import Skills from './Skills/Skills';
import Experience from './Experience/Experience';

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

const SkillsSection = () => (
  <section className="col-sm-offset-4 col-sm-4">
    <div className={`${text.subTitle} ${text.center}`}>
      Proficient with
    </div>
    <Skills/>
  </section>
);

//  <span className={`glyphicon glyphicon-new-window`} style={{fontSize: '80%'}}/>
const ProjectSummarySection = () => (
  <section className="col-sm-offset-3 col-sm-6" style={{marginTop: '40px'}}>
    <div className={text.sectionTitle}>
      Projects
    </div>
    <Center>
      <ProjectThumbnailsMini/>
    </Center>
  </section>
);

const ExperienceSection = () => (
  <section className="col-sm-offset-3 col-sm-6" style={{marginTop: '40px'}}>
    <div className={text.sectionTitle}>Title</div>
    <Center><Experience/></Center>
  </section>
);

export default () => (
  <section>
    <Brief/>
    <SkillsSection/>
    <section className="col-sm-offset-2 col-sm-8" style={{marginTop: '40px'}}>
      <Summary/>
    </section>
    <ProjectSummarySection/>
    <section className="col-sm-12 visible-lg visible-md hidden-sm hidden-xs" style={{marginTop: '40px'}}>
      <Logos/>
    </section>
  </section>
);
