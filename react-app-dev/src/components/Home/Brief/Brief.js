import React from 'react';
import PhotoWidget from './PhotoWidget';

//css
import text from '@styles/text.css';
import icons from '@fonts/icons/icons.css';

import Center from '@lib/Center';

export default class Brief extends React.Component {
  constructor(props){
    super(props);

  }

  render() {

    return (
      <div style={{padding: 30 + 'px'}} className="well">
        <PhotoWidget/>
        <div className={`${text.title + " " + text.center}`}>
          Ashley Phillips
        </div>
        <div className={`${text.bold + " " + text.center}`}>
          <span className={icons['icon-graduation-cap']}/>
          <span>&nbsp; 2:1 Mathematics</span>
          <br/>
          <span>University of Brighton</span>
          <br/>
          <br/>
        </div>
        <div className={text.regular}>
          Erm... hello there. I am Ashley Phillips. Sort CSS out around social
          buttons hover. To be defined in same file! And pulled over to social
          button.
        </div>
      </div>
    );
  }



}
