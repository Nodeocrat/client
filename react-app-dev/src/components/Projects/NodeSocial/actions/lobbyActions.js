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
