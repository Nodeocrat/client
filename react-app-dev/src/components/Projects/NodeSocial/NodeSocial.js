import React from 'react';
import socket from './SocketHandler';
import * as Emit from './EmitHandler';
import Lobby from './Lobby/Lobby';
import Game from './Game/Game';
import store from '@store/store';
import * as lobbyActions from './actions/lobbyActions';
import NodeShooter from './NodeShooter/NodeShooter';
import Ajax from '@services/Ajax';
import EventTypes from './EventTypes';

export const Views = {
  LOADING: 'LOADING',
  LOBBY: 'LOBBY',
  GAME: 'GAME'
};

//temporary placeholder
const Loading = props => (
  <div>Loading...</div>
);

export default class NodeSocial extends React.Component {
  constructor(props){
    super(props);

    this.socket = null;
    this.state = {
      view: Views.LOBBY
    };
    this.setView = this.setView.bind(this);
    this.handleJoinGame = this.handleJoinGame.bind(this);
  }

  setView(view){
    this.setState({view});
  }

  componentWillMount(){
    this.socket = socket;
    this.socket.on(EventTypes.CONNECT, () => console.log('Succesfully connected to server'));
    this.socket.on(EventTypes.DISCONNECT, () => console.log('Disconnected from socket.io'));
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
      data: {},
      response: 'JSON',
      success: response => {
        if(response.result === 'success'){
          console.log('join game success');
          store.dispatch(lobbyActions.joinGameSuccess());
          const nodeShooter = NodeShooter()(socket);
          Emit.initFinish();
          nodeShooter.onStart(() => self.setView(Views.GAME));
          console.log('join game success fn leaving');
        } else if (response.result === 'error'){
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
        mainView = <Loading/>;
    }

    return (
      <section style={this.props.style}>
        {mainView}
      </section>
    );
  }

};
