import React from 'react';
import {Link} from 'react-router-dom';

//media
import socialAppThumbnail from '@media/social-app-thumbnail.png';
import nbThumbnail from '@media/nb-thumbnail.png';
import apThumbnail from '@media/ap-thumbnail.png';

//styles
import border from '@styles/border.css';
import text from '@styles/text.css';
import position from '@styles/position.css';

const projects = [
  {
    name: "Social App",
    summary: "Lobby integrated with Node Shooter",
    img: socialAppThumbnail,
    route: "NodeSocial"
  },
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

const ProjectThumbnails = () => (
  <div>
  {
    projects.map((project) => (
      <Link key={project.name} to={`projects/${project.route}`}>
        <figure style={{margin: 25 + 'px', display: 'inline-block'}} className={`${border.shadow} ${border.hoverShadow}`}>
          <img alt="" height="185" width="300" src={project.img}/>
          <div className={`${text.center} ${text.subTitle}`}>{project.name}</div>
        </figure>
      </Link>
    ))
  }
  </div>
);

const ProjectThumbnailsMini = props => (
  <div {...props}>
  {
    projects.map((project) => (
      <Link key={project.name} to={`projects/${project.route}`}>
        <div style={{verticalAlign: 'top', margin: 10 + 'px', display: 'inline-block'}}>
          <figure className={position.center}><img alt="" style={{margin: 20 + 'px'}} height="92.5" width="150" src={project.img} className={`${border.shadow} ${border.hoverShadow}`}/></figure>
          <div className={`${position.spanParent} ${text.center} ${text.regular}`}>{project.name}</div>
        </div>
      </Link>
    ))
  }
  </div>
);

export {ProjectThumbnails as default, ProjectThumbnailsMini}
