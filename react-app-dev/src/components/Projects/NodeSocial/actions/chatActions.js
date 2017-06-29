import * as Types from './actionTypes';
import * as Emit from '../EmitHandler';

export function addMessage(message){
  return {type: Types.ADD_MESSAGE, message};
}

function sendMessageError(msgId){
  return {type: Types.SEND_MESSAGE_ERROR};
}

export function sendMessage(message){
  Emit.sendMessage(message);
  //return {type: Types.ADD_MESSAGE, message};
  return {type: 'PLACEHOLDER'};
}

export function addPlayers(players){
  return ({type: Types.ADD_PLAYERS, players});
}

export function removePlayers(usernames){
  return ({type: Types.REMOVE_PLAYERS, usernames});
}

export function setPlayersOffline(usernames){
  return ({type: Types.SET_PLAYERS_OFFLINE, usernames});
}
