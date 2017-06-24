import React from 'react';
import chat from './Chat.css';
import scrollbar from '@styles/scrollbar.css';

/*
<span class="all">
    <span class="group-1">
      <input type="text" placeholder="b" />
    </span>
    <span class="group-2">
      <span class="a">A</span>
    </span>
</span>*/

/*
<div className={chat.sendForm}>
  <button className={chat.sendBtn} type="button" onClick={props.onSendMessage}>Send</button>
  <input type="text" className={chat.input} onKeyDown={e => {if(e.keyCode == 13) props.onSendMessage()}} onChange={props.onSendTextChange} value={props.sendText}/>
</div>
*/

const PlayerItem = ({player}) => (
  <div className={chat.playerListItem}>
    <img alt="profile pic" style={{borderRadius: 50 + '%', marginRight: 10 + 'px'}} height="30px" width="30px"
      src={player.picUrl}/>
    <span className={chat.playerListName}>{player.username}</span>
  </div>
);

const ChatMessage = ({player, message}) => (
  <div>
    <img alt="profile pic" style={{borderRadius: 50 + '%', marginRight: 10 + 'px'}} height="30px" width="30px"
      src={player.picUrl}/>
    <span>
      <span>{player.username}</span>
      <div>{message.text}</div>
    </span>
  </div>
);

export default class extends React.Component {
  render(){
    return (
      <div className={chat.main}>
        <div className={chat.flexContainer}>
          <div className={chat.outputInputContainer}>
            <div className={`${chat.output} ${scrollbar.dark1}`} ref={el => { this.chatBody = el; }}>
              {
                this.props.chatMessages.map(msg => <ChatMessage key={msg.id} player={this.props.players.get(msg.username)} message={msg}/>)
              }
            </div>
            <span className={chat.sendForm}>
              <input type="text" className={chat.input} onKeyDown={e => {if(e.keyCode === 13) this.props.onSendMessage()}} onChange={this.props.onSendTextChange} value={this.props.sendText} />
              <span className={chat.sendBtn} onClick={this.props.onSendMessage}>Send</span>
            </span>

          </div>
          <div className={`${chat.userList} ${scrollbar.dark1}`} id="lolly">
            {
              this.props.players.map(player => player.status !== 'offline' ? <PlayerItem key={player.username} player={player}/> : null)
            }
          </div>
        </div>
      </div>
    );
  }
  componentDidUpdate(){
    this.chatBody.scrollTop = this.chatBody.scrollHeight - this.chatBody.clientHeight;
  }
}
