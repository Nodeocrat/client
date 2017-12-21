import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ChatView from '../Chat/ChatView';
import EventTypes from '../EventTypes';
import OrderedHash from '../utils/OrderedHash';
import GameCreation from './GameCreation';
import RoomComponent from '../utils/RoomComponent';
import StatusDialog from '../utils/StatusDialog';
import {ClientRoom, Rooms} from 'client-room';

class Lobby extends RoomComponent {
  constructor(props){
    super(props);

    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleCreateGame = this.handleCreateGame.bind(this);
    this.handleSendTextChange = this.handleSendTextChange.bind(this);
    this.handleJoinGame = this.handleJoinGame.bind(this);
    this.init = this.init.bind(this);
    this.state = {
      showStatusDialog: false,
      statusText: "",
      loading: true,
      sendText: ""
    };
  }

  componentWillMount(){
    console.log('pre-mounting...');
    let room = null;
    if(this.props.roomId) // Then the room should already have been setup
      room = Rooms.get(this.props.roomId);
    if(!room)
      return this.init();
    else
      this._room = room;

    //TODO Unpause room... Do this after so you know it's worked.
  }

  get room(){
    return this._room;
  }

  init(){
    this.join('/api/socialapp/lobby/join')
      .then(() => {
        this.on(EventTypes.CHAT_MESSAGE_RECEIVED,
          message => this.props.actions.addMessage(message));
        this.on(EventTypes.PLAYER_JOINED,
          player => this.props.actions.addPlayers([player]));
        this.on(EventTypes.PLAYER_LEFT,
          username => this.props.actions.setPlayerOffline(username));
        this.on(EventTypes.PLAYER_JOINED_GAME,
          ({player, game}) => {
            this.props.actions.updatePlayer(player);
            this.props.actions.updateGame(game);
          });
        this.on(EventTypes.UPDATE_GAME,
          game => this.props.actions.updateGame(game));
        this.on(EventTypes.UPDATE_PLAYER,
          player => this.props.actions.updatePlayer(player));
        this.on(EventTypes.ADD_GAME,
          game => this.props.actions.addGames([game]));
        this.on(EventTypes.GAME_ENDED,
          game => this.props.actions.removeGame(game));
        this.on('START', response => {
          console.log('starting...');
          const players = new OrderedHash({array: response.players});
          const gameList = new OrderedHash({array: response.gameList});
          this.props.actions.addPlayers(players);
          this.props.actions.addGames(gameList);

          //Think we're just gonna have to use redux only...?
          this.setState({loading: false});
        });

        this.initialized();
        this.props.actions.joinedLobby(this.room.id);
      })
      .catch(err => {
        return console.log(`Error while attempting to join socialapp/lobby: ${err}`);
      });
  }

  componentWillUnmount(){
    this.props.actions.leftLobby();
  }

  handleCreateGame(options){
    console.log('options: ' + JSON.stringify(options));
    this.emit(EventTypes.CREATE_GAME, options/*, res => {
      if(res.error)
        this.setState({showStatusDialog: true, statusText: res.error});
    }*/);
  }

  handleSendMessage(){
    this.emit('SEND_MESSAGE', this.state.sendText);
    this.setState({
      sendText: ""
    });
  }

  handleSendTextChange(e){
    this.setState({sendText: e.target.value});
  }

  handleJoinGame(id){
    const gameRoom = new ClientRoom();
    console.log(`Attempting to join game ${id}`);
    gameRoom.join(`/api/socialapp/joingame/${id}`)
      .then(() => {
        console.log('join game success');
        this.props.history.push(`${this.props.match.path}/game`, {roomId: id});
      })
      .catch(err => {
        console.log(`Error while trying to join socialapp/joingame: ${err}`);
        //TODO Popup dialog error.
      });
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
              onJoinGame={this.handleJoinGame}/>
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
    gameList: state.lobby.gameList,
    roomId: state.lobby.roomId
  };
}

import * as chatActions from '../actions/chatActions';
import * as lobbyActions from '../actions/lobbyActions';
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({...chatActions, ...lobbyActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
