import store from '@store/store';
import OrderedHash from '@lib/OrderedHash';
import * as chatActions from './actions/chatActions';
import * as lobbyActions from './actions/lobbyActions';
import {Views} from './NodeSocial';

const EventTypes = {
  INIT_LOBBY: 'INIT_LOBBY',
  DISCONNECT: 'disconnect',
  CONNECT: 'connect',
  CHAT_MESSAGE_RECEIVED: 'CHAT_MESSAGE_RECEIVED',
  PLAYERS_LEFT: 'PLAYERS_LEFT',
  PLAYERS_JOINED: 'PLAYERS_JOINED'
};

export default (socket, setView) => {

  socket.on(EventTypes.CONNECT, () => console.log('Succesfully connected to server'));

  socket.on(EventTypes.DISCONNECT, () => console.log('Disconnected from socket.io'));

  //Chat actions
  socket.on(EventTypes.CHAT_MESSAGE_RECEIVED, message => {
    store.dispatch(chatActions.addMessage(message));
  });

  socket.on(EventTypes.PLAYERS_JOINED, players => {
    store.dispatch(chatActions.addPlayers(players));
  });

  socket.on(EventTypes.INIT_LOBBY, players => {
    const playersContainer = new OrderedHash({JSON: players});
    store.dispatch(chatActions.setPlayers(playersContainer));
    setView(Views.LOBBY);
  });

  socket.on(EventTypes.PLAYERS_LEFT, usernames => {
    store.dispatch(chatActions.setPlayersOffline(usernames));
  });
};
