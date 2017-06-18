import * as Types from './actionTypes';
import * as Emit from '../EmitHandler';

//message format: id, username, timestamp (ISO), text
export function addMessage(message){
  return {type: Types.ADD_MESSAGE, message};
}

function sendMessageError(msgId){
  return {type: Types.SEND_MESSAGE_ERROR};
}

export function sendMessage(message){
  Emit.sendMessage(message);
  return {type: Types.ADD_MESSAGE, message};
}
