import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ChatView from '../Chat/ChatView';
import EventTypes from '../EventTypes';
import Ajax from '@services/Ajax';
import OrderedHash from '@lib/OrderedHash';
import GameCreation from './GameCreation';
import WsComponent from '@NodeSocial/utils/WsComponent';
import StatusDialog from '@NodeSocial/utils/StatusDialog';

class NodeSocial extends WsComponent {
  constructor(props){
    super(props);

    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleCreateGame = this.handleCreateGame.bind(this);
    this.handleSendTextChange = this.handleSendTextChange.bind(this);
    this.state = {
      showStatusDialog: false,
      statusText: "",
      loading: true,
      sendText: ""
    };
    this.roomId = '!lobby!';
  }

  componentWillMount(){

    const self = this;
    //TODO Set loading screen
    Ajax.post({
      url: '/socialapp/lobby/join',
      data: {},
      response: 'JSON',
      success: response => {
        if(response.success){
          self.on(`${self.roomId}${EventTypes.CHAT_MESSAGE_RECEIVED}`,
            message => self.props.actions.addMessage(message));
          self.on(`${self.roomId}${EventTypes.PLAYER_JOINED}`,
            player => self.props.actions.addPlayers([player]));
          self.on(`${self.roomId}${EventTypes.PLAYER_LEFT}`,
            player => self.props.actions.setPlayerOffline(player.username));
          self.on(`${self.roomId}${EventTypes.PLAYER_JOINED_GAME}`,
            (player, game) => {
              self.props.actions.updatePlayer(player);
              self.props.actions.updateGame(game);
            });
          self.on(`${self.roomId}${EventTypes.UPDATE_GAME}`,
            game => self.props.actions.updateGame(game));
          self.on(`${self.roomId}${EventTypes.ADD_GAME}`,
            game => self.props.actions.addGames([game]));
          self.on(`${self.roomId}START`, response => {
            const players = new OrderedHash({array: response.players});
            const gameList = new OrderedHash({array: response.gameList});
            self.props.actions.addPlayers(players);
            self.props.actions.addGames(gameList);
            self.setState({loading: false});
          });
          console.log(`${self.roomId}emitting CLIENT_INITIALIZED`);
          self._socket.emit(`${self.roomId}CLIENT_INITIALIZED`);
        } else if (response.error){
          //TODO implement
        } else {
          console.log('unspecified error');
        }
      },
      error: info => {
        if(info.xhr.status !== 200)
          return console.error("Ajax request error on login page: " + info.error);
      }
    });
  }

  componentWillUnmount(...args){
    super.componentWillUnmount(...args);
    this._socket.emit(`${this.roomId}${EventTypes.EXIT}`);
    this.props.actions.leftLobby();
  }

  handleCreateGame(options){
    console.log('options: ' + JSON.stringify(options));
    this._socket.emit(`${this.roomId}${EventTypes.CREATE_GAME}`, {options}, res => {
      if(res.error)
        this.setState({showStatusDialog: true, statusText: res.error});
    });
  }

  handleSendMessage(){
    this._socket.emit(`${this.roomId}SEND_MESSAGE`, this.state.sendText);
    this.setState({
      sendText: ""
    });
  }

  handleSendTextChange(e){
    this.setState({sendText: e.target.value});
  }

  render(){
    /*let testPlayers = new OrderedHash();
    for(let i = 0; i < 50; i++)
      testPlayers.insert(`TestUser${i+1}`, {username: `TestUser${i+1}`, picUrl: "https://i.vimeocdn.com/portrait/58832_300x300"});

    let testMsgs = []; //{id, username, timestamp (ISO), text, group}
    for(let i = 0; i < 100; i++)
      testMsgs.push({id: i, username: `TestUser${Math.floor(i/2)+1}`, text: `asdf oia jsdfoiaj sdfiaojsdf ${i}`});*/

    /*players={this.props.players}
    chatMessages={this.props.chatMessages}
    <GameCreation gameList={this.props.gameList}/>*/

    //const gameList = [{id: "testgame", name: "Test Game", playerCount: 5}];

    return (
      <section style={{position: 'relative'}}>
        <div id="node-social-popup"/>
        {this.state.loading ?
          <div>Loading lobby...</div> :
          <div>
            <GameCreation gameList={this.props.gameList}
              onCreateGame={this.handleCreateGame}
              onJoinGame={this.props.onJoinGame}/>
            <ChatView
              players={this.props.players}
              chatMessages={this.props.chatMessages}
              onSendMessage={this.handleSendMessage}
              onSendTextChange={this.handleSendTextChange}
              sendText={this.state.sendText}/>
            { this.state.showStatusDialog ?
              <StatusDialog text={this.state.statusText} root="node-social-popup" onClose={()=>{this.setState({showStatusDialog: false})}}/>
              : null
            }
          </div>
        }
      </section>
    );
  }

};

function mapStateToProps(state, ownProps){
  return {
    chatMessages: state.lobby.chatMessages,
    players: state.lobby.players,
    gameList: state.lobby.gameList
  };
}

import * as chatActions from '../actions/chatActions';
import * as lobbyActions from '../actions/lobbyActions';
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({...chatActions, ...lobbyActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeSocial);
