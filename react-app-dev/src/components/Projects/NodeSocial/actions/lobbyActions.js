import * as Types from './actionTypes';
import * as Emit from '../EmitHandler';

export function createGame(){
  return {type: Types.CREATE_GAME};
}

export function joinGameSuccess(initData){
  console.log(`Join game success. initData: ${JSON.stringify(initData)}`);
  return {type: Types.JOIN_GAME_SUCCESS, initData};
}

export function joinGameError(error){
  return {type: Types.JOIN_GAME_ERROR, error};
}

export function joinGame(){
  Emit.joinGame({});
  return {type: Types.JOIN_GAME};
}
