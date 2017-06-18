import store from '@store/store';

import * as chatActions from './actions/chatActions';

const EventTypes = {
  DISCONNECT: 'disconnect',
  CONNECT: 'connect',
  CHAT_MESSAGE_RECEIVED: 'CHAT_MESSAGE_RECEIVED'
};

export default socket => {

  socket.on(EventTypes.CONNECT, () => console.log('Succesfully connected to server'));

  socket.on(EventTypes.DISCONNECT, () => console.log('Disconnected from socket.io'));

  //Chat actions
  socket.on(EventTypes.CHAT_MESSAGE_RECEIVED, message => {
    store.dispatch(chatActions.addMessage(message));
  });
};
