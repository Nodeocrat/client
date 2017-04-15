import React from 'react';
import {Route, Link} from 'react-router-dom';

import {PropsRoute} from '@lib/CustomRoutes';
import ApProj from './ApProj';
import NbProj from './GameProj';
import Center from '@lib/Center';

import nbThumbnail from '@media/nb-thumbnail.png';
import apThumbnail from '@media/ap-thumbnail.png';
import text from '@styles/text.css';
import border from '@styles/border.css';

export default (props) => {

  const projects = [
    {
      name: "Node Shooter",
      summary: "Loopless game server experiment",
      img: nbThumbnail,
      route: "GameProj"
    },
    {
      name: "Auslander-Parter Algorithm",
      summary: "Implementation of the Auslander-Parter planarity testing agorithm",
      img: apThumbnail,
      route: "ApProj"
    }
  ];

  return (
    <div>
      <Route exact path={props.match.url} render={() => (
        <div>
          <div className={`${text.center} ${text.title}`}>Projects</div>
            <Center>
              {
                projects.map((project) => (
                  <Link key={project.name} to={`${props.match.url + '/' + project.route}`}>
                    <div style={{margin: 25 + 'px', display: 'inline-block'}} className={`${border.shadow} ${border.hoverShadow}`}>
                      <img height="185" width="300" src={project.img}/>
                      <div className={`${text.center} ${text.subTitle}`}>{project.name}</div>
                    </div>
                  </Link>
                ))
              }
            </Center>
        </div>
      )}/>
      <Route path={`${props.match.url}/ApProj`} component={ApProj}/>
      <PropsRoute profile={props.user.profile} path={`${props.match.url}/GameProj`} component={NbProj}/>
    </div>
  );
};
