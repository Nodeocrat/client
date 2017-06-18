import * as Types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.chat, action){

  switch(action.type){
    case Types.ADD_MESSAGE:
      return [...state, action.message];

    case Types.SEND_MESSAGE_ERROR:
      console.log('SEND_MESSAGE_ERROR');
      return state;

    default:
      return state;
  }
}
