//TODO
//1. create input with 'google-id' ID property which will hold the google acc id
//2. Anything with 'google-link-btn' will have a whole host of functionality
//attached to it. Will NOT have to do ANYTHING except a single div field 'google-lnk-btn'
// the rest will be trivial.

let googleLinkContainer = null;
let googlePhotoUrl = null;
let googleId = null;
let googleName = null;
let autoSubmit = false;

const googleLinkBtn = (function(){
  const centerEle = document.createElement('div');
  centerEle.className = "center-outer";
  const innerCenter = document.createElement('div');
  innerCenter.className = "center-inner";
  centerEle.appendChild(innerCenter);

  const btnEle = document.createElement('button');
  btnEle.type = "button";
  btnEle.className = "btn social-login-btn google-bg-color";
  const iconEle = document.createElement('span');
  iconEle.className = "btn-icon icon-gplus";
  const sepEle = document.createElement('span');
  sepEle.className = "separator";
  const textSpan = document.createElement('span');
  textSpan.className = "social-btn-text";
  textSpan.innerHTML = "Link to Google";
  btnEle.appendChild(iconEle);
  btnEle.appendChild(sepEle);
  btnEle.appendChild(textSpan);
  innerCenter.appendChild(btnEle);
  return centerEle;
})();

const createGoogleLinkedDiv = function(picUrl, name){

  const outer1 = document.createElement('div');
  outer1.className = "center-outer";
  const outer2 = document.createElement('div');
  outer2.className = "center-outer";
  const outer3 = document.createElement('div');
  outer3.className = "center-outer";
  const outer4 = document.createElement('div');
  outer4.className = "center-outer";

  const inner1 = document.createElement('div');
  inner1.className = "center-inner";
  const inner2 = document.createElement('div');
  inner2.className = "center-inner";
  const inner3 = document.createElement('div');
  inner3.className = "center-inner";
  const inner4 = document.createElement('div');
  inner4.className = "center-inner";

  outer1.appendChild(inner1);
  outer2.appendChild(inner2);
  outer3.appendChild(inner3);
  outer4.appendChild(inner4);

  const container = document.createElement('div');
  const label = document.createElement('label');
  label.innerHTML = "Linked with Google";
  const btnEle = document.createElement('button');
  btnEle.type = "button";
  btnEle.className = "link-button";
  btnEle.appendChild(document.createTextNode("(Unlink)"));
  btnEle.addEventListener("click", unlinkGoogle);
  const imgEle = document.createElement('img');
  imgEle.classList = "photo-border google-border-color";
  imgEle.src = picUrl;
  imgEle.height = "100";
  imgEle.width = "100";
  const nameEle = document.createElement('div');
  nameEle.innerHTML = name;
  inner1.appendChild(label);
  inner2.appendChild(btnEle);
  inner3.appendChild(imgEle);
  inner4.appendChild(nameEle);
  container.appendChild(outer1);
  container.appendChild(outer2);
  container.appendChild(outer3);
  container.appendChild(outer4);
  container.id = "google-linked-container";
  return container;
};

// This function should be called after the HTML has rendered
nc.onload(function(){
  if(googleLinkContainer !== undefined)
    googleLinkContainer = document.getElementById('link-google');
  if(googleLinkContainer){
    if(googleLinkContainer.hasAttribute('autosubmit'))
      autoSubmit = true;

    let redirect = false;
    try {
      if(redirectGoogleId && redirectGooglePhotoUrl && redirectGoogleName)
        redirect = true;
    } catch (e){}
    if(redirect){
      googlePhotoUrl = redirectGooglePhotoUrl;
      googlePhotoUrl = googlePhotoUrl.replace(/\&\#x3D;/g, '=');
      googlePhotoUrl = googlePhotoUrl.replace(/sz=50/g, 'sz=100');
      googleId = redirectGoogleId;
      googleName = redirectGoogleName;
      googleLinkContainer.appendChild(createGoogleLinkedDiv(googlePhotoUrl, googleName));
    } else {
      googleLinkContainer.appendChild(googleLinkBtn);
    }
  }
  gapi.load('auth2', function(){
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
      client_id: '227957552401-315nik1jk75v73abqfv4olericorbdt9.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin'
      // Request scopes in addition to 'profile' and 'email'
      //scope: 'additional_scope'
    });
    attachSignin(googleLinkBtn);
  });
});

function attachSignin(element) {
  auth2.attachClickHandler(element, {},
      function(googleUser) {
        const profile = googleUser.getBasicProfile();
        googlePhotoUrl = profile.getImageUrl();
        googleId = profile.getId();
        googleName = profile.getName();

        if(autoSubmit){
          nc.ajax({
            type: 'POST',
            url: '/account/link/google',
            data: {
              profile: {id: googleId, photoUrl: googlePhotoUrl, name: googleName}
            },
            response: 'JSON',
            success: (response) => {
              if(nc.displayStatus(response, '#google-message-container')){
                googleLinkContainer.removeChild(googleLinkBtn);
                googleLinkContainer.appendChild(createGoogleLinkedDiv(googlePhotoUrl, profile.getName()));
              }
            },
            error: (info) => {
              if(info.xhr.status !== 200)
                return console.error("Ajax request error on account update: " + info.error);
            }
          });
        } else {
          googleLinkContainer.removeChild(googleLinkBtn);
          googleLinkContainer.appendChild(createGoogleLinkedDiv(googlePhotoUrl, profile.getName()));
        }
      }, function(error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
}

function unlinkGoogle(){
  console.log('in unlinkGoogle');
  if(autoSubmit){
    nc.ajax({
      type: 'POST',
      url: '/account/unlink/google',
      response: 'JSON',
      success: (response) => {
        if(nc.displayStatus(response, '#google-message-container')){
          googlePhotoUrl = null;
          googleId = null;
          googleLinkContainer.removeChild(document.querySelector("#google-linked-container"));
          googleLinkContainer.appendChild(googleLinkBtn);
        }
      },
      error: (info) => {
        if(info.xhr.status !== 200)
          return console.error("Ajax request error on account update: " + info.error);
      }
    });
  } else {
    googlePhotoUrl = null;
    googleId = null;
    googleLinkContainer.removeChild(document.querySelector("#google-linked-container"));
    googleLinkContainer.appendChild(googleLinkBtn);
  }
}
