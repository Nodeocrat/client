import * as Types from '@actions/types';
import initialState from '@store/initialState';

export default function accountReducer(state = initialState.account, action){

  let newState = state;
  const profile = profileReducer(state.profile, action);
  const linkedProfiles = linkedProfilesReducer(state.linkedProfiles, action);

  if(profile || linkedProfiles){
    let newChanges = {};
    if(profile)
      newChanges.profile = profile;
    if(linkedProfiles)
      newChanges.linkedProfiles = linkedProfiles;

    newState = Object.assign({}, state, newChanges);
  }

  return newState;
}

function profileReducer(state = initialState.account.profile, action){
  switch(action.type){
    case Types.PROFILE_UPDATE_ERROR:
      return Object.assign({}, state, {
          errors: {other: action.errors},
          actions: []
        });

    case Types.PROFILE_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        editMode: false,
        errors: {},
        actions: action.actions
      });

    case Types.EXIT_PROFILE_EDIT_MODE:
      return Object.assign({}, state, {editMode: false, errors: {}, actions: []});

    case Types.ENTER_PROFILE_EDIT_MODE:
      return Object.assign({}, state, {editMode: true, errors: {}, actions: []});

    default:
      return null;
  }
}

function linkedProfilesReducer(state = initialState.account.linkedProfiles, action){
  switch(action.type){
    case Types.UNLINK_ERROR:
      return Object.assign({}, state, {
        [action.site]: {
          errors: action.errors,
          actions: []
        }
      });

    case Types.UNLINK_SUCCESS:
      return Object.assign({}, state, {
        [action.site]: {
          errors: [],
          actions: [`Unlinked from ${action.site}`]
        }
      });

    case Types.LINK_ERROR:
      return Object.assign({}, state, {
        [action.site]: {
          errors: action.errors,
          actions: []
        }
      });

    case Types.LINK_SUCCESS:
      return Object.assign({}, state, {
        [action.site]: {
          errors: [],
          actions: [`Linked to ${action.site}`]
        }
      });

    default:
      return null;
  }
}
