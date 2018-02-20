import React from 'react';
import PhotoWidget from './PhotoWidget';

//css
import text from '@styles/text.css';
import icons from '@fonts/icons/icons.css';

export default (props) => {

  const style = {
    paddingTop: 10 + 'px',
    paddingBottom: 30 + 'px'
  }

  return (
    <section style={style} className="">
      <PhotoWidget/>
      <div className={`${text.title + " " + text.center}`}>
        Ashley Phillips
      </div>
      <div className={`${text.regular + " " + text.center}`}>
        <span className={icons['icon-graduation-cap']}/>
        <span>&nbsp; 2:1 Mathematics University of Brighton</span>
        <br/>
        <span className={icons['icon-mail']}/>
        <span>&nbsp; ashley.phillips@nodeocrat.com</span>
        <br/>
        <a href="/AshleyPhillips-CV-20180220.pdf" target="_blank">View CV</a>
      </div>
      <div className={text.regular}>
      </div>
    </section>
  );
}
