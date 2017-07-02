import * as Types from '@actions/types';
import Ajax from '@services/Ajax';

function initiateUserSuccess(user){
  return {type: Types.INITIATE_USER_SUCCESS, user};
}

export function initiateUser(user){
  return dispatch => {
    Ajax.get({
      url: '/account/user',
      response: 'JSON',
      success: res => {
        if(res.user)
          return dispatch(initiateUserSuccess(res.user));
      },
      error: err => {
        throw new Error(err);
      }
    });
  };
}

function localLoginSuccess(user){
  return {type: Types.LOCAL_LOGIN_SUCCESS, user: user};
}

export function localLoginError(errors){
  return {type: Types.LOCAL_LOGIN_ERROR, errors};
}

export function localLogin(username, password){
  return dispatch => {
    Ajax.post({
      url: '/auth/local',
      response: 'JSON',
      data: {username, password},
      success: res => {
        if(res.errors && res.errors.length > 0){
          dispatch(localLoginError(res.errors));
        } else if (res.user){
          dispatch(localLoginSuccess(res.user));
        }
      },
      error: err => {
        throw new Error(err);
      }
    });

    /*setTimeout(() => {
      const testUser = {
        initialized: true,
        signedIn: true,
        profile: {
          username: "TestUser",
          email: "test@nodeocrat.com",
          photoUrl: "https://delmarva.streetlightoutages.com/common/images/organizations/_default/unavailablePhoto.png",
          passwordSet: false
        },
        linkedProfiles: {
          facebook: null,
          google: null
        },
        errors: []
      };
      dispatch(localLoginSuccess(testUser));
    }, 1000)*/
  };
}

export function guestLogin(){
  return dispatch => {
    Ajax.post({
      url: '/auth/guest',
      response: 'JSON',
      success: res => {
        if(res.errors && res.errors.length > 0){
          dispatch(localLoginError(res.errors));
        } else if (res.user){
          dispatch(localLoginSuccess(res.user));
        }
      },
      error: err => {
        throw new Error(err);
      }
    });
  };
}

function unlinkSuccess(site){
  return {type: Types.UNLINK_SUCCESS, site};
}

function unlinkError(site, errors){
  return {type: Types.UNLINK_ERROR, site, errors};
}

export function unlink(site){
  return dispatch => {
    Ajax.post({
      url: `/account/unlink/${site}`,
      response: 'JSON',
      success: (response) => {
        if(response.actions && response.actions.length > 0) {
          dispatch(unlinkSuccess(site));
        } else if(response.errors && response.errors.length > 0) {
          dispatch(unlinkError(site, response.errors));
        }
      },
      error: (info) => {
        if(info.xhr.status !== 200)
          return console.error("Ajax request error on login page: " + info.error);
      }
    });
  };
}

import GoogleOAuthHelper from '@services/GoogleOAuthHelper';
import FacebookOAuthHelper from '@services/FacebookOAuthHelper';
const OAuthHelpers = {
  "google": GoogleOAuthHelper,
  "facebook": FacebookOAuthHelper
};
function linkSuccess(site, profile){ //profile is the social linking profile
  return {type: Types.LINK_SUCCESS, site, profile};
}
function linkError(site, errors){
  return {type: Types.LINK_ERROR, site, errors};
}
export function link(site){
  return dispatch => {
    if(!Object.keys(OAuthHelpers).includes(site))
      return dispatch(linkError([`No such site: ${site}`]));
    const OAuthHelper = new OAuthHelpers[site];

    OAuthHelper.signIn({
      success: profile => {

        Ajax.post({
          url: `/account/link/${site}`,
          data: {profile: profile},
          response: 'JSON',
          success: response => {
            if(!response.errors && response.profile)
              return dispatch(linkSuccess(site, response.profile));
            else if(response.errors && response.errors.length > 0)
              return dispatch(linkError(site, response.errors));
          },
          error: info => {
            if(info.xhr.status !== 200)
              return console.error("Ajax request error on login page: " + info.error);
          }
        });
      },
      error: reason => {
        // Errors are handled well enough by the clients
      }
    });
  };
}

function updateProfileSuccess(newProfile, actions){
  return {type: Types.PROFILE_UPDATE_SUCCESS, profile: newProfile, actions};
}

export function updateProfileError(errors){
  return {type: Types.PROFILE_UPDATE_ERROR, errors};
}

export function updateProfile(data){
  return dispatch => {
    Ajax.post({
      url: '/account/update',
      data: data,
      response: 'JSON',
      success: response => {
        if(!response.errors && response.profile) {
          return dispatch(updateProfileSuccess(response.profile, response.actions));
        } else if(response.errors && response.errors.length > 0) {
          return dispatch(updateProfileError(response.errors));
        }
      },
      error: info => dispatch(updateProfileError([info.error]))
    });
  };
}

function logoutSuccess(user){
  return {type: Types.LOGOUT_SUCCESS, user};
}

function logoutError(errors){
  return {type: Types.LOGOUT_ERROR, errors};
}

export function logout(){
  return dispatch => {
    Ajax.post({
      url: '/auth/logout',
      response: 'JSON',
      success: res => {
        if(!res.errors)
          dispatch(logoutSuccess(res.user));
        else
          dispatch(logoutError(res.errors));
      },
      error: res => {
        //TODO modal dialog
        console.log(res);
      }
    });
  }
}
