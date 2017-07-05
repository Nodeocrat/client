import React from 'react';
import * as Emit from '@NodeSocial/utils/EmitHandler';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.leave = this.leave.bind(this);
  }
  leave(){
    this.props.onLeave();
    Emit.leaveGame();
  }
  render(){
    return (
      <div>
        <div><button id="leave-node-shooter" type="button" onClick={this.leave}>Leave</button></div>
        <canvas id="node-shooter" height="800" width="800" style={{borderStyle: 'solid', borderWidth: 5 + 'px'}}></canvas>
      </div>
    );
  }
}
