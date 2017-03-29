import React from 'react';

//react-bootstrap
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

//custom components
import SocialProfile from '@components/OAuth/SocialProfile';
import SocialButton from '@components/SocialButton/SocialButton';
import GRecaptcha from '@lib/GRecaptcha';
import StatusText from '@lib/StatusText';
import Center from '@lib/Center';
import GoogleOAuthHelper from '@services/GoogleOAuthHelper';
import FacebookOAuthHelper from '@services/FacebookOAuthHelper';
import Ajax from '@services/Ajax';

export default class ModalDialog extends React.Component {
  constructor(props){
    super(props);

    this.handleLinkToGoogle = this.handleLinkToGoogle.bind(this);
    this.handleGoogleUnlink = this.handleGoogleUnlink.bind(this);
    this.handleLinkToFacebook = this.handleLinkToFacebook.bind(this);
    this.handleFacebookUnlink = this.handleFacebookUnlink.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
    this.handleGRecaptchaResponse = this.handleGRecaptchaResponse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      googleOAuthReady: false,
      facebookProfile: null,
      googleProfile: null,
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      recaptchaResponse: null,
      errors: []
    }

    this.GoogleOAuthHelper = new GoogleOAuthHelper(() => {
      this.setState({
        googleOAuthReady: true
      });
    });

    this.facebookOAuthHelper = new FacebookOAuthHelper();
  }
  render() {
    return (
      <Modal show onHide={this.props.history.goBack}>
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-6">
                <div className="well" style={{height: 210 + 'px'}}>
                  <Center>
                  {
                    this.state.googleProfile ?
                      (
                        <SocialProfile photoUrl={this.state.googleProfile.photoUrl}
                          onUnlink={this.handleGoogleUnlink} site="google"
                          name={this.state.googleProfile.name}/>
                      )
                      :
                      (
                        <div style={{paddingTop: 68 + 'px'}}>
                          <SocialButton disabled={this.googleOAuthReady} site="google"
                            text="Link to Google" onClick={this.handleLinkToGoogle}/>
                        </div>
                      )
                  }
                  </Center>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="well" style={{height: 210 + 'px'}}>
                  <Center>
                  {
                    this.state.facebookProfile ?
                      (
                        <SocialProfile photoUrl={this.state.facebookProfile.photoUrl}
                          onUnlink={this.handleFacebookUnlink} site="facebook"
                          name={this.state.facebookProfile.name}/>
                      )
                      :
                      (
                        <div style={{paddingTop: 68 + 'px'}}>
                          <SocialButton site="facebook"
                            text="Link to Facebook" onClick={this.handleLinkToFacebook}/>
                        </div>
                      )
                  }
                  </Center>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" placeholder="Required"
                    value={this.state.username} onChange={this.handleUsernameChange}/>
                </div>
                 <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" placeholder="Required"
                    value={this.state.email} onChange={this.handleEmailChange}/>
                </div>
                <div className="form-group">
                  <label>{"Password" + (this.state.facebookProfile || this.state.googleProfile ?
                  " (Optional)" : "")}</label>
                  <input type="password" className="form-control"
                    placeholder={this.state.facebookProfile || this.state.googleProfile ?
                    "Optional" : "Required"} onChange={this.handlePasswordChange}/>
                </div>
                <div className="form-group">
                  <label>{"Confirm password" + (this.state.facebookProfile || this.state.googleProfile ?
                  " (Optional)" : "")}</label>
                  <input type="password" className="form-control"
                    placeholder={this.state.facebookProfile || this.state.googleProfile ?
                    "Optional" : "Required"}
                    disabled={this.state.password === ""}
                    onChange={this.handlePasswordConfirmChange}
                    value={this.state.passwordConfirm}/>
                </div>
              </div>
            </div>

            <div className="row">
              <Center>
                <GRecaptcha onResponse={this.handleGRecaptchaResponse}/>
              </Center>
            </div>
            {this.state.errors.length > 0 ?
              (<Center><StatusText type="error" text={this.state.errors}/></Center>)
              : null
            }
          </Modal.Body>
          <Modal.Footer>
            <Center>
              <Button onClick={this.handleSubmit}>Submit</Button>
              <Button onClick={this.props.history.goBack}>Cancel</Button>
            </Center>
          </Modal.Footer>
        </div>
      </Modal>

    );
  }
  handleLinkToGoogle(){
    this.GoogleOAuthHelper.signIn({
      success: (profile) => {
        const newState = {
          googleProfile: profile
        };
        if(this.state.email === "")
          newState.email = profile.email;
        if(this.state.username === "")
          newState.username = profile.name.replace(/\s/g,'');
        this.setState(newState);
      },
      error: (reason) => {
        // Errorrs are handled well enough by the client for now
      }
    });
  }
  handleGoogleUnlink(){
    this.setState({
      googleProfile: null
    })
  }
  handleLinkToFacebook(){
    this.facebookOAuthHelper.signIn({
      success: (profile) => {
        const newState = {
          facebookProfile: profile
        };
        if(this.state.email === "")
          newState.email = profile.email;
        if(this.state.username === "")
          newState.username = profile.name.replace(/\s/g,'');
        this.setState(newState);
      }
    });
  }
  handleFacebookUnlink(){
    this.setState({
      facebookProfile: null
    });
  }
  handleUsernameChange(e){
    this.setState({
      username: e.target.value
    });
  }
  handleEmailChange(e){
    this.setState({
      email: e.target.value
    });
  }
  handlePasswordChange(e){
    const newState = {
      password: e.target.value
    }
    if(e.target.value === "")
      newState.passwordConfirm = "";
    this.setState(newState);
  }
  handlePasswordConfirmChange(e){
    this.setState({
      passwordConfirm: e.target.value
    });
  }
  handleGRecaptchaResponse(response){
    this.setState({
      recaptchaResponse: response
    });
  }
  handleSubmit(){
    const sendData = {};

    const errors = [];
    if(!this.state.username)
      errors.push("Username must be provided");
    if(!this.state.email)
      errors.push("Email must be provided");
    if(!this.state.facebookProfile && !this.state.googleProfile
      && !this.state.password)
      errors.push("Password must be provided if no social accounts have been linked");
    if(this.state.password !== this.state.passwordConfirm)
      errors.push("Password and password confirmation do not match");
    if(!this.state.recaptchaResponse)
      errors.push("Recaptcha must be completed");

    if(errors.length > 0)
      return this.setState({ errors: errors});

    sendData.username = this.state.username;
    sendData.password = this.state.password;
    sendData.email = this.state.email;
    sendData.profiles = {};
    sendData.profiles.google = this.state.googleProfile;
    sendData.profiles.facebook = this.state.facebookProfile;
    sendData.recaptchaResponse = this.state.recaptchaResponse;

    Ajax.post({
      url: '/register',
      data: sendData,
      response: 'JSON',
      success: (response) => {
        if(response.errors && response.errors.length > 0){
          this.setState({
            errors: response.errors
          });
          window.grecaptcha.reset();
        } else if (response.actions && response.actions.length > 0){
          this.props.history.goBack();
        }
      },
      error: (info) => {
        if(info.xhr.status !== 200)
          return console.error("Ajax request error on login page: " + info.error);
      }
    });
  }
};
