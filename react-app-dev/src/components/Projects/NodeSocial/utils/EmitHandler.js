import socket from './SocketHandler';

const EventTypes = {
  INIT_FINISH: 'INIT_FINISH',
  LEAVE_GAME: 'LEAVE_GAME'
};

export const joinGame = info => socket.emit(EventTypes.JOIN_GAME, info);
export const initFinish = () => socket.emit(EventTypes.INIT_FINISH);
export const leaveGame = () => socket.emit(EventTypes.LEAVE_GAME);
