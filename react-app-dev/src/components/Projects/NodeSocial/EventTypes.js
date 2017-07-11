export default {
  DISCONNECT: 'disconnect',
  CONNECT: 'connect',

  //Chat events
  CHAT_MESSAGE_RECEIVED: 'CHAT_MESSAGE_RECEIVED',

  //Lobby events to emit to server
  EXIT: 'EXIT',
  CREATE_GAME: 'CREATE_GAME',

  //Lobby events to listen to from server
  PLAYER_LEFT: 'PLAYERS_LEFT',
  PLAYER_JOINED: 'PLAYERS_JOINED',
  PLAYER_JOINED_GAME: 'PLAYER_JOINED_GAME',
  PLAYER_LEFT_GAME: 'PLAYER_LEFT_GAME',
  ADD_GAME: 'ADD_GAME',
  UPDATE_GAME: 'UPDATE_GAME',
  GAME_ENDED: 'GAME_ENDED'
};
