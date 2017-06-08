import * as Types from '@actions/types';
import initialState from '@store/initialState';

export default function userReducer(state = initialState.user, action){

  switch(action.type){
    case Types.LOCAL_LOGIN_SUCCESS:
      return Object.assign({}, state, action.user);

    case Types.LOGOUT_SUCCESS:
      return Object.assign({}, state, action.user);

    case Types.PROFILE_UPDATE_SUCCESS:
      //TODO try using state but change only the profile.
      //console.log(JSON.stringify(action.profile));
      return Object.assign({}, state, {profile: action.profile});

    case Types.LINK_SUCCESS:
      const newLinkedProfiles1 = Object.assign({}, state.linkedProfiles,
        {
          [action.site]: action.profile
        }
      );
      return Object.assign({}, state, {linkedProfiles: newLinkedProfiles1});

    case Types.UNLINK_SUCCESS:
      const newLinkedProfiles2 = Object.assign({}, state.linkedProfiles,
        {
          [action.site]: null
        }
      );
      return Object.assign({}, state, {linkedProfiles: newLinkedProfiles2});

    case Types.INITIATE_USER_SUCCESS:
      return Object.assign({}, {initialized: true}, action.user);

    default:
      return state;
  }
}
