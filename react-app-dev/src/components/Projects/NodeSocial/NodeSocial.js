import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {apiPrefix} from '@global/SiteConfig';
import * as chatActions from './actions/chatActions';
import ChatView from './Chat/ChatView';

import socket from './SocketHandler';
import IncomingMessageHandler from './IncomingMessageHandler';

class NodeSocial extends React.Component {
  constructor(props){
    super(props);

    this.socket = null;
    this.messageHandler = null;
    this.sendMessage = this.sendMessage.bind(this);
    this.handleSendTextChange = this.handleSendTextChange.bind(this);
    this.state = {
      sendText: "",
      currentMatchId: 0
    };
  }

  componentWillMount(){
    this.socket = socket;
    this.socket.connect();
    this.incomingMessageHandler = IncomingMessageHandler(this.socket);
  }

  componentWillUnmount(){
    this.socket.disconnect();
  }

  sendMessage(){
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

    return (
      <section>
        <ChatView
          onSendMessage={this.sendMessage}
          chatMessages={[]}
          sendText={this.state.sendText}
          onSendTextChange={this.handleSendTextChange}/>
      </section>
    );
  }

};

function mapStateToProps(state, ownProps){
  return {
    chatMessages: state.chat
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(chatActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeSocial);
