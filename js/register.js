function register() {

  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("passwordConfirm").value;

  const facebookId = document.getElementById("facebook-id").value;
  const facebookName = document.getElementById("facebook-name").value;
  //const facebookPhotoUrl = document.getElementById("facebook-photo-url").value;
  //const googleId = /*document.getElementById("google-id").value ||*/ null;
  //const googlePhotoUrl = /*document.getElementById("google-photo-url").value ||*/ null;

  if(password !== passwordConfirm)
    return nc.displayStatus({"errors": "Password and password confirmation do not match"}, "#status");

  const recaptchaRes = grecaptcha.getResponse();

  let regObj = {};
  if(!username)
    return nc.displayStatus({"errors": "Username field cannot be empty"}, "#status");
  else
    regObj.username = username;

  if(!email)
    return nc.displayStatus({"errors": "Email field cannot be empty"}, "#status");
  else
    regObj.email = email;


  regObj.profiles = {};
  if(facebookId){
    regObj.profiles.facebook = {
      id: facebookId,
      photoUrl: "http://graph.facebook.com/" + facebookId + "/picture?type=normal",
      name: facebookName
    }
  }
  if(googleId){
    regObj.profiles.google = {
      id: googleId,
      photoUrl: googlePhotoUrl,
      name: googleName
    }
  }

  if(password)
    regObj.password = password;

  if(!facebookId && !googleId && !password)
    return nc.displayStatus({"errors": "A password must be provided if no social accounts have been linked"}, "#status");

  if(!recaptchaRes)
    return nc.displayStatus({"errors": "Recaptcha must be completed before submitting"}, "#status");
  else
    regObj.recatchaResponse = recaptchaRes;

  //TODO Validation (on all above parameters)

  nc.ajax({
    type: 'POST',
    url: '/register',
    data: regObj,
    response: 'JSON',
    success: (response) => {
      if(response.errors && response.errors.length > 0){
        nc.displayStatus(response, '#status');
        grecaptcha.reset();
      } else if (response.actions && response.actions.length > 0){
        nc.replaceBodyWithMsg(response);
      }
    },
    error: (info) => {
      if(info.xhr.status !== 200)
        return console.error("Ajax request error on login page: " + info.error);
    }
  });

}
