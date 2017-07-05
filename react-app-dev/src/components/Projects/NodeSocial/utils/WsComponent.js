import React from 'react';

export default class WsComponent extends React.Component {
  constructor(props){
    super(props);
    this._socket = this.props.socket;
    this._socketEventsMap = new Map();
  }

  on(event, listener){
    this._socket.on(event, listener);
    this._socketEventsMap.set(event, listener);
  }

  componentWillUnmount(){
    for(let [event, handler] of this._socketEventsMap)
      this._socket.off(event, handler);
  }
}
