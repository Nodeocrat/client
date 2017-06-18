import React from 'react';

export default props => (
  <div>
    <div>The Final Strand</div>
    <ul>
      {
        props.chatMessages.map(msg => <li key={msg.id}><div>{msg.text}</div></li>)
      }
    </ul>
    <input type="text" onChange={props.onSendTextChange} value={props.sendText}/>
    <button type="button" onClick={props.onSendMessage}>Send</button>
  </div>
);
