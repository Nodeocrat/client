import * as Types from '@actions/types';
import initialState from '@store/initialState';

export default function loginReducer(state = initialState.login, action){

  switch(action.type){
    case Types.LOCAL_LOGIN_ERROR:
      return {errors: {other: action.errors}};

    case Types.LOCAL_LOGIN_SUCCESS:
      return {errors: {}};

    case Types.OPEN_LOGIN_DIALOG:
      return state;

    case Types.CLOSE_LOGIN_DIALOG:
      return state;

    default:
      return state;
  }
}
