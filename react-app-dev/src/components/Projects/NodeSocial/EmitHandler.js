import socket from './SocketHandler';

const EventTypes = {
  SEND_MESSAGE: 'SEND_MESSAGE',
  INIT_FINISH: 'INIT_FINISH',
  LEAVE_GAME: 'LEAVE_GAME'
};

export const sendMessage = msg => socket.emit(EventTypes.SEND_MESSAGE, msg);
export const joinGame = info => socket.emit(EventTypes.JOIN_GAME, info);
export const initFinish = () => socket.emit(EventTypes.INIT_FINISH);
export const leaveGame = () => socket.emit(EventTypes.LEAVE_GAME);
