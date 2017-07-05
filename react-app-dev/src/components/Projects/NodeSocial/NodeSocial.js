import React from 'react';
import socket from '@NodeSocial/utils/SocketHandler';
import * as Emit from '@NodeSocial/utils/EmitHandler';
import Lobby from './Lobby/Lobby';
import Game from './Game/Game';
import store from '@store/store';
import * as lobbyActions from './actions/lobbyActions';
import NodeShooter from './NodeShooter/NodeShooter';
import Ajax from '@services/Ajax';
import EventTypes from './EventTypes';
import NodeSocialDescription from './NodeSocialDescription';

export const Views = {
  CONNECTING: 'CONNECTING',
  LOBBY: 'LOBBY',
  GAME: 'GAME'
};

//temporary placeholder
const Connecting = props => (
  <div>Establishing connection...</div>
);

export default class NodeSocial extends React.Component {
  constructor(props){
    super(props);

    this.socket = null;
    this.state = {
      view: Views.LOADING
    };
    this.setView = this.setView.bind(this);
    this.handleJoinGame = this.handleJoinGame.bind(this);
  }

  setView(view){
    this.setState({view});
  }

  componentWillMount(){
    this.socket = socket;
    this.socket.on(EventTypes.CONNECT, () => {
      console.log('connected to socket.io');
      this.setState({view: Views.LOBBY});
    });
    this.socket.on(EventTypes.DISCONNECT, () => {
      console.log('Disconnected from socket.io');
      this.setState({view: Views.CONNECTING});
    });
    this.socket.connect();
  }

  componentWillUnmount(){
    this.socket.disconnect();
    this.socket.off(EventTypes.CONNECT);
    this.socket.off(EventTypes.DISCONNECT);
  }

  handleJoinGame(){
    const self = this;
    this.setView(Views.LOADING);
    Ajax.post({
      url: '/socialapp/joingame',
      data: {id: "testgame"},
      response: 'JSON',
      success: response => {
        if(response.success){
          console.log('join game success');
          store.dispatch(lobbyActions.joinGameSuccess());
          const nodeShooter = NodeShooter()(socket);
          Emit.initFinish();
          nodeShooter.onStart(() => self.setView(Views.GAME));
          console.log('join game success fn leaving');
        } else if (response.error){
          //self.setView(Views.LOBBY);
          //store.dispatch(lobbyActions.joinGameError(response.reason));
        } else {
          console.log('unspecified error');
        }
      },
      error: info => {
        if(info.xhr.status !== 200)
          return console.error("Ajax request error on login page: " + info.error);
        self.setView(Views.LOBBY);
      }
    });
  }

  render(){

    let mainView = null;
    switch(this.state.view){
      case Views.LOBBY:
        mainView = <Lobby socket={this.socket} onJoinGame={this.handleJoinGame}/>;
        break;
      case Views.GAME:
        mainView = <Game onLeave={() => this.setView(Views.LOBBY)} socket={this.socket}/>
        break;
      default:
        mainView = <Connecting/>;
    }

    return (
      <section>
        <NodeSocialDescription/>
        {mainView}
      </section>
    );
  }

};
