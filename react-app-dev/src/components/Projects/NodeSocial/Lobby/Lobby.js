import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as chatActions from '../actions/chatActions';
import * as lobbyActions from '../actions/lobbyActions';
import ChatView from '../Chat/ChatView';
import EventTypes from '../EventTypes';
import Ajax from '@services/Ajax';
import OrderedHash from '@lib/OrderedHash';
import GameCreation from './GameCreation';

class NodeSocial extends React.Component {
  constructor(props){
    super(props);

    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleSendTextChange = this.handleSendTextChange.bind(this);
    this.state = {
      sendText: "",
      currentMatchId: 0
    };
    this.socketEventsMap = new Map(this.socketEventHandlers);
  }

  get socketEventHandlers() {
    return [
      [
        EventTypes.CHAT_MESSAGE_RECEIVED,
        message => this.props.actions.addMessage(message)
      ],
      [
        EventTypes.PLAYERS_JOINED,
        players => this.props.actions.addPlayers(players)
      ],
      [
        EventTypes.PLAYERS_LEFT,
        usernames => this.props.actions.setPlayersOffline(usernames)
      ],
      [
        EventTypes.PLAYER_JOINED_GAME,
        (players, game) => {
          this.props.actions.updatePlayers(players);
          this.props.actions.updateGame(game);
        }
      ],
      [
        EventTypes.UPDATE_GAME,
        game => this.props.actions.updateGame(game)
      ],
      [
        EventTypes.ADD_GAMES,
        games => this.props.actions.addGames(games)
      ]
    ];
  }

  componentWillMount(){
    const self = this;
    //TODO Set loading screen
    for(let [event, handler] of this.socketEventsMap)
      this.props.socket.on(event, handler);
    Ajax.post({
      url: '/socialapp/lobby/join',
      data: {},
      response: 'JSON',
      success: response => {
        if(response.result === 'success'){

          const lobbyPlayers = new OrderedHash({JSON: response.players});
          const gameList = new OrderedHash({JSON: response.gameList});
          self.props.actions.addPlayers(lobbyPlayers);
          self.props.actions.addGames(gameList);
        } else if (response.result === 'error'){
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

  componentWillUnmount(){
    for(let [event, handler] of this.socketEventsMap)
      this.props.socket.off(event, handler);
    this.props.actions.leftLobby();
  }

  handleSendMessage(){
    this.props.actions.sendMessage({text: this.state.sendText, matchId: this.state.currentMatchId});
    this.setState({
      sendText: "",
      currentMatchId: this.state.currentMatchId++
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

    const gameListTest = [{name: "Test Game", id: "testgame", players: 0}];
    /*players={this.props.players}
    chatMessages={this.props.chatMessages}
    <GameCreation gameList={this.props.gameList}/>*/
    return (
      <section>
        <GameCreation gameList={this.props.gameList} onJoinGame={this.props.onJoinGame}/>
        <ChatView
          onSendMessage={this.sendMessage}
          players={this.props.players}
          chatMessages={this.props.chatMessages}
          onSendMessage={this.handleSendMessage}
          onSendTextChange={this.handleSendTextChange}
          sendText={this.state.sendText}/>
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

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({...chatActions, ...lobbyActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeSocial);
