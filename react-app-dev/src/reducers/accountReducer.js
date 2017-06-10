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
          updatedSuccess: []
        });

    case Types.PROFILE_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        editMode: false,
        errors: {},
        updatedSuccess: action.actions
      });

    case Types.EXIT_PROFILE_EDIT_MODE:
      return Object.assign({}, state, {editMode: false, errors: {}, updatedSuccess: []});

    case Types.ENTER_PROFILE_EDIT_MODE:
      return Object.assign({}, state, {editMode: true, errors: {}, updatedSuccess: []});

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
          updatedSuccess: []
        }
      });

    case Types.UNLINK_SUCCESS:
      return Object.assign({}, state, {
        [action.site]: {
          errors: [],
          updatedSuccess: [`Unlinked from ${action.site}`]
        }
      });

    case Types.LINK_ERROR:
      return Object.assign({}, state, {
        [action.site]: {
          errors: action.errors,
          updatedSuccess: []
        }
      });

    case Types.LINK_SUCCESS:
      return Object.assign({}, state, {
        [action.site]: {
          errors: [],
          updatedSuccess: [`Linked to ${action.site}`]
        }
      });

    default:
      return null;
  }
}
