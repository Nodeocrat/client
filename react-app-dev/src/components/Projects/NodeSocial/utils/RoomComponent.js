import React from 'react';
import {ClientRoom} from '../node_modules/client-room/index.js';

//NOTE when extending this class:
// If you use componentWillUnmount hook in the subclass, be sure to call
// super.componentWillUnmount

export default class RoomComponent extends React.Component {
  constructor(props, ops = {}){
    super(props);
    this._room = ops.room || new ClientRoom();
  }

  on(event, listener){
    this._room.on(event, listener);
  }

  emit(...args){
    this._room.emit(...args);
  }

  join(url){
    return this._room.join(url);
  }

  initialized(){
    this._room.initialized();
  }
}
