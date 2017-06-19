import React from 'react';
import chat from './Chat.css';

export default props => (
  <div className={chat.main}>
    <div className={chat.flexContainer}>
      <div className={chat.output}>
        {
          props.chatMessages.map(msg => <div className={chat.message}>{msg.text}</div>)
        }
      </div>
      <div className={chat.userList}>
        <div className={chat.userListItem}>Zukias</div>
        <div className={chat.userListItem}>Chigo</div>
        <div className={chat.userListItem}>Demaut</div>
      </div>
    </div>
    <div className={chat.sendForm}>
      <button className={chat.sendBtn} type="button" onClick={props.onSendMessage}>Send</button>
      <input type="text" className={chat.input} onChange={props.onSendTextChange} value={props.sendText}/>
    </div>
  </div>
);
