import * as Types from './actionTypes';

export function createGame(){
  return {type: Types.CREATE_GAME};
}

export function joinGameSuccess(){
  // Clear chat messages etc.
  return {type: Types.JOIN_GAME_SUCCESS};
}

export function joinGameError(error){
  return {type: Types.JOIN_GAME_ERROR, error};
}

export function leftLobby(){
  return {type: Types.LEFT_LOBBY};
}

export function updatePlayers(players){
  return {type: Types.UPDATE_PLAYERS, players};
}

export function addGames(games){
  return {type: Types.ADD_GAMES, games};
}

export function updateGame(game){
  return {type: Types.UPDATE_GAME, game};
}
