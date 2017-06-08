import ScriptLoader from '@services/ScriptLoader';

export default class GoogleOAuthHelper {
  constructor(){
    this.googleAuth = null;
    this.apiLoaded = false;
    this.taskList = [];

    ScriptLoader([
     "https://apis.google.com/js/api:client.js"
    ], () => {
      window.gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        window.auth2 = window.gapi.auth2.init({
          client_id: '227957552401-315nik1jk75v73abqfv4olericorbdt9.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        this.googleAuth = window.gapi.auth2.getAuthInstance();
        this.apiLoaded = true;
        while(this.taskList.length > 0)
          this.taskList.shift()();
      });
    });
  }

  _signIn(options){
    this.googleAuth.signIn().then((googleUser) => {
      const googleProfile = googleUser.getBasicProfile();
      const profile = {
        email: googleProfile.getEmail(),
        name: googleProfile.getName(),
        photoUrl: googleProfile.getImageUrl(),
        id: googleProfile.getId()
      };
      if(options.success)
        options.success(profile);
    },
    (reason) => {
      if(options.error)
        options.error(reason);
    });
  }

  signIn(options){
    if(this.apiLoaded)
      this._signIn(options);
    else
      this.taskList.push(this._signIn.bind(this, options));
  }
};
