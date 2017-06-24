import React from 'react';
import socket from './SocketHandler';
import IncomingMessageHandler from './IncomingMessageHandler';
import Lobby from './Lobby/Lobby';

export const Views = {
  LOADING: 'LOADING',
  LOBBY: 'LOBBY',
  GAME: 'GAME'
};

const Loading = props => (
  <div>Loading...</div>
);

const Game = props => (
  <div>Game</div>
);

export default class NodeSocial extends React.Component {
  constructor(props){
    super(props);

    this.socket = null;
    this.messageHandler = null;
    this.state = {
      view: Views.LOADING
    };
    this.setView = this.setView.bind(this);
  }

  setView(view){
    this.setState({view});
  }

  componentWillMount(){
    this.socket = socket;
    this.socket.connect();
    this.incomingMessageHandler = IncomingMessageHandler(this.socket, this.setView);
  }

  componentWillUnmount(){
    this.socket.disconnect();
  }

  render(){

    let mainView = null;
    switch(this.state.view){
      case Views.LOBBY:
        mainView = <Lobby/>;
        break;
      case Views.GAME:
        mainView = <Game/>
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
