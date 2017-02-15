const usernameEle = document.getElementById("usernameedit");
const emailEle = document.getElementById("emailedit");
const messageContainer = document.getElementById('message-container');

function edit(){
  //const usernameEle = document.getElementById("usernameedit");
  //const emailEle = document.getElementById("emailedit");
  usernameEle.removeAttribute('readonly');
  emailEle.removeAttribute('readonly');
  $('#collapse1').collapse('show');
  const nl = document.querySelectorAll('.form-submission');
  var arr = [];
  for(var i = nl.length; i--; arr.unshift(nl[i]));
  arr.forEach((btn) => {
    btn.removeAttribute('disabled');
  });
}

let email = emailEle.value;
let username = usernameEle.value;

function cancelUpdate(keepMessages) {
  usernameEle.readOnly = true;
  emailEle.readOnly = true;
  $('#collapse1').collapse('hide');

  const formSubmissionList = document.querySelectorAll('.form-submission');
  var formSubArr = [];
  for(var i = formSubmissionList.length; i--; formSubArr.unshift(formSubmissionList[i]));
  formSubArr.forEach((btn) => {
    btn.disabled = true;
  });

  usernameEle.value = username;
  emailEle.value = email;
  const passwordUpdateList = document.querySelectorAll('.password-update');
  var passArr = [];
  for(var i = passwordUpdateList.length; i--; passArr.unshift(passwordUpdateList[i]));
  passArr.forEach((inputEle) => {
    inputEle.value = "";
  });

  if(!keepMessages)
    messageContainer.innerHTML = '';
}
function updateAccount() {

  let dataObj = {};
  const newEmail = emailEle.value;
  const newUsername = usernameEle.value;
  const newPassword = document.getElementById("new-password-edit").value;
  const confirmPassword = document.getElementById("confirm-password-edit").value;
  const currentPassEle = document.getElementById("current-password-edit");

  if(newPassword || confirmPassword){
    if(newPassword !== confirmPassword)
      return nc.displayStatus({"errors": "New password and password confirmation do not match"}, messageContainer);

    if(currentPassEle){
      if(!currentPassEle.value)
        return nc.displayStatus({"errors": "Must enter current password"}, messageContainer);
      else
        dataObj.currentPassword = currentPassEle.value;
    }
  }


  dataObj.email = newEmail;
  dataObj.username = newUsername;
  dataObj.newPassword = newPassword;

  nc.ajax({
    type: 'POST',
    url: '/account/update',
    data: dataObj,
    response: 'JSON',
    success: (response) => {
      if(nc.displayStatus(response, messageContainer) && response.actions.length > 0)
      {
        const currentPasswordElement = document.getElementById('current-password-edit');

        // Successful update
        if(newEmail)
          email = newEmail;
        if(newUsername)
          username = newUsername;
        cancelUpdate(true);
        if(newPassword && !currentPasswordElement){ // Then a password has just been added to account
          // So we must change the layout of the password panel
          document.getElementById('password-update-container').innerHTML =
            '<div>Current password <input id="current-password-edit" type="password" class="form-control password-update"></div>' +
            '<br>' +
            '<div>New password <input id="new-password-edit" type="password" class="form-control password-update"></div>' +
            '<br>' +
            '<div>Confirm new password <input id="confirm-password-edit" type="password" class="form-control password-update"></div>';
          document.querySelector('.password-status').innerHTML = 'You have a password set on your account';
        }

      }
    },
    error: (info) => {
      if(info.xhr.status !== 200)
        return console.error("Ajax request error on account update: " + info.error);
    }
  });

}
function preUnlink(done){

  nc.ajax({
    type: 'POST',
    url: '/account/unlink/facebook',
    response: 'JSON',
    success: (response) => {
      if(nc.displayStatus(response, '#fb-message-container'))
        done("preLink");
    },
    error: (info) => {
      if(info.xhr.status !== 200)
        return console.error("Ajax request error on account update: " + info.error);
    }
  });

}
function preLink(fbProfile, done){

  const photoUrl = "http://graph.facebook.com/" + fbProfile.id + "/picture?type=normal";

  nc.ajax({
    type: 'POST',
    url: '/account/link/facebook',
    data: {
      profile: {id: fbProfile.id, photoUrl: photoUrl, name: fbProfile.name}
    },
    response: 'JSON',
    success: (response) => {
      if(nc.displayStatus(response, '#fb-message-container'))
        done("preUnlink");
    },
    error: (info) => {
      if(info.xhr.status !== 200)
        return console.error("Ajax request error on account update: " + info.error);
    }
  });
}
