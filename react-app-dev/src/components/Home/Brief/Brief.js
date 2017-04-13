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

    const style = {
      paddingTop: 30 + 'px',
      paddingBottom: 30 + 'px',
      borderWidth: 1 + 'px',
      borderColor: '#eeeeee',
      borderRadius: 5 + 'px',
      borderStyle: 'solid',
      backgroundColor: '#f5f5f5'
    }

    return (
      <div style={style} className="">
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
        </div>
        <div className={text.regular}>
        </div>
      </div>
    );
  }



}
