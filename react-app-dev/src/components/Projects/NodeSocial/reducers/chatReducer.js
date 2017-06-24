import * as Types from '../actions/actionTypes';
import initialState from './initialState';
import OrderedHash from '@lib/OrderedHash';

export default function loginReducer(state = initialState.chat, action){

  switch(action.type){
    case Types.ADD_MESSAGE:
      return Object.assign({}, state, {messages: [...state.messages, action.message]});

    case Types.SEND_MESSAGE_ERROR:
      //TODO implement
      console.log('SEND_MESSAGE_ERROR');
      return state;

    case Types.SET_PLAYERS:
      //action.players.print('SET_PLAYERS');
      return Object.assign({}, state, {players: action.players});

    case Types.ADD_PLAYERS:
      //state.players.print('ADD_PLAYERS_START');
      const newPlayers = new OrderedHash({clone: state.players});
      newPlayers.insertMany(action.players, 'username');
      //newPlayers.print('ADD_PLAYERS_END');
      return Object.assign({}, state, {players: newPlayers});

    case Types.REMOVE_PLAYERS:
      const newPlayersRemoved = new OrderedHash({clone: state.players});
      for(let username of action.usernames)
        newPlayersRemoved.remove(username);
      return Object.assign({}, state, {players: newPlayersRemoved});

    case Types.SET_PLAYERS_OFFLINE:
      state.players.print('SET_PLAYERS_OFFLINE_START');
      const newPlayersSetOffline = new OrderedHash({clone: state.players});
      for(let username of action.usernames)
        newPlayersSetOffline.get(username).status = 'offline';
      newPlayersSetOffline.print('SET_PLAYERS_OFFLINE_START');
      return Object.assign({}, state, {players: newPlayersSetOffline});

    default:
      return state;
  }
}
