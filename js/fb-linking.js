// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response, callback) {
  // Response object format:
  /*{
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
  }*/
  if (response.status === 'connected') {
    // Logged into your app and Facebook.

    FB.api('/me', function(response) {
      console.log('in FB API /me response');
      const fbId = response.id.toString();
      const fbName = response.name;
      if(callback){
        callback({id: fbId, name: fbName}, (preLinkFnStr) => {displayProfile("link-facebook", fbId, fbName, preLinkFnStr);});
      } else {
        document.getElementById('facebook-id').value = fbId;
        displayProfile('link-facebook', fbId, fbName);
      }
    });

  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('fb-message-container').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('fb-message-container').innerHTML = 'Please log ' +
      'into Facebook.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '211294722567307',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });

  // Now that we've initialized the JavaScript SDK, we call
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  /*FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });*/

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function _unlink(preLinkFn){
  FB.logout(function(response){});
  const parentEle = document.getElementById('link-facebook');
  if(preLinkFn !== undefined && preLinkFn)
    parentEle.innerHTML =
          '<div class="center-outer"><div class="center-inner"><button id="fb-link-button" type="button" class="btn social-login-btn facebook-bg-color" onclick="link(' + preLinkFn + ');">' +
            '<span class="btn-icon icon-facebook"></span>' +
            '<span class="separator"></span>' +
            '<span class="social-btn-text">Link to Facebook</span>' +
          '</button></div></div>';
  else
    parentEle.innerHTML =
          '<div class="center-outer"><div class="center-inner"><button id="fb-link-button" type="button" class="btn social-login-btn facebook-bg-color" onclick="link();">' +
            '<span class="btn-icon icon-facebook"></span>' +
            '<span class="separator"></span>' +
            '<span class="social-btn-text">Link to Facebook</span>' +
          '</button></div></div>';
  document.getElementById('facebook-id').value = null;
}

// To hook into unlink before it executes, create preUnlink function. A function
// parameter will be passed. Call this once pre-processing is finished.
function unlink(preUnlink){
  if(preUnlink) // if there is a pre unlink function call it and pass _unlink as a callback
    preUnlink(_unlink);
  else
    _unlink();
}

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function displayProfile(elementId, id, name, preLinkFnStr) {
  const parentEle = document.getElementById(elementId);

  //size: small, normal, album, large, square",
  let str;
  if(preLinkFnStr)
    str = preLinkFnStr
  else
    str = "";

  parentEle.innerHTML =
    "<div class=\'center-outer\'><div class=\'center-inner\'><label>Linked with Facebook</label></div></div>" +
    "<div class=\'center-outer\'><div class=\'center-inner\'><button type=\'button\' onclick=\'unlink(" + str + ");\' class=\'link-button\'>(Unlink)</button></div></div>" +
    "<div class=\'center-outer\'><div class=\'center-inner\'><img width=\'100\' height=\'100\' class=\'photo-border facebook-border-color\'" +
    "src=\'http://graph.facebook.com/" + id + "/picture?type=normal\'></div></div>" +
    '<div class=\'center-outer\'><div class=\'center-inner\'>' + name + '</div></div>';
}

function link(callback){
  FB.login(function(response){
    statusChangeCallback(response, callback);
  }, {scope: 'public_profile'});
}
