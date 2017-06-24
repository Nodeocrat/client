import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as chatActions from '../actions/chatActions';
import * as lobbyActions from '../actions/lobbyActions';
import ChatView from '../Chat/ChatView';

class NodeSocial extends React.Component {
  constructor(props){
    super(props);

    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleSendTextChange = this.handleSendTextChange.bind(this);
    this.state = {
      sendText: "",
      currentMatchId: 0
    };
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


    return (
      <section>
        <button type="button" onClick={this.props.actions.joinGame}>Join Game</button>
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
    chatMessages: state.chat.messages,
    players: state.chat.players
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({...chatActions, ...lobbyActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeSocial);
