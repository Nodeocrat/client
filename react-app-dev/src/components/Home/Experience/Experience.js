import React from 'react';
import position from '@styles/position.css';
import text from '@styles/text.css';
import ancoaLogo from '@media/ancoa-logo.png';
import swordLogo from '@media/sword-apak-logo.png';

export default class extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div {...this.props}>
        <div style={{verticalAlign: 'top', margin: 10 + 'px', display: 'inline-block'}}>
          <div className={position.center}>
            <div className={text.subTitle}>Ancoa</div>
            <img height="29" width="168" alt="logo" src={ancoaLogo}/>
          </div>
        </div>
        <div style={{verticalAlign: 'top', margin: 10 + 'px', display: 'inline-block'}}>
          <div className={position.center}>
            <div className={text.subTitle}>Sword APAK</div>
            <img alt="logo" src={swordLogo}/>
          </div>
        </div>
      </div>
    );
  }
}
