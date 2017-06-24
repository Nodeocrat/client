import socket from './SocketHandler';

const EventTypes = {
  SEND_MESSAGE: 'SEND_MESSAGE',
  JOIN_GAME: 'JOIN_GAME'
};

export const sendMessage = msg => socket.emit(EventTypes.SEND_MESSAGE, msg);
export const joinGame = info => socket.emit(EventTypes.JOIN_GAME, info);
