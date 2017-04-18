import React from 'react';
import Center from '@lib/Center';

import text from '@styles/text.css';
import ancoaLogo from '@media/ancoa-logo.png';
import swordLogo from '@media/sword-apak-logo.png';

export default class extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <div style={{verticalAlign: 'top', margin: 10 + 'px', display: 'inline-block'}}>
          <Center>
            <div className={text.subTitle}>Ancoa</div>
            <img height="29" width="168" alt="logo" src={ancoaLogo}/>
          </Center>
        </div>
        <div style={{verticalAlign: 'top', margin: 10 + 'px', display: 'inline-block'}}>
          <Center>
            <div className={text.subTitle}>Sword APAK</div>
            <img alt="logo" src={swordLogo}/>
          </Center>
        </div>
      </div>
    );
  }
}
