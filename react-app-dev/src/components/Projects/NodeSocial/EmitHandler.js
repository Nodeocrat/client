import socket from './SocketHandler';

const EventTypes = {
  SEND_MESSAGE: 'SEND_MESSAGE'
};

export const sendMessage = msg => socket.emit(EventTypes.SEND_MESSAGE, msg);
