export default class FacebookOAuthHelper {
  constructor(){
    this.apiLoaded = false;
    this.taskList = [];

    window.fbAsyncInit = () => {
      window.FB.init({
        appId      : '211294722567307',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.5' // use graph api version 2.5
      });
      this.apiLoaded = true;
      while(this.taskList.length > 0)
        this.taskList.shift()();
    };
    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(window.document, 'script', 'facebook-jssdk'));
  }

  _signIn(options){
    window.FB.login(function(response){
      if (response.status === 'connected') {
        window.FB.api('/me?fields=name,email', function(apiResponse) {
          const fbId = apiResponse.id.toString();
          const fbPhotoUrl = "https://graph.facebook.com/" + fbId +
            "/picture?type=normal";
          if(options.success)
            options.success({
              name: apiResponse.name,
              email: apiResponse.email,
              photoUrl: fbPhotoUrl,
              id: fbId
            });
        });
      } else if (response.status === 'not_authorized') {
        //to be implemented once modal alerts implemented
        console.log('Please log into this app.');
      } else {
        //to be implemented once modal alerts implemented
        console.log('Please log into Facebook.');
      }
    }, {scope: 'public_profile'});
  }

  signIn(options){
    if(this.apiLoaded)
      this._signIn(options);
    else
      this.taskList.push(this._signIn.bind(this, options));
  }
};
