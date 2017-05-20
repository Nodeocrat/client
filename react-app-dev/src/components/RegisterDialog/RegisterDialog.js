import React from 'react';

//react-bootstrap
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

//custom components
import SocialProfile from '@components/OAuth/SocialProfile';
import SocialButton from '@lib/SocialButton/SocialButton';
import GRecaptcha from '@lib/GRecaptcha';
import StatusText from '@lib/StatusText';
import TextField from '@lib/TextField';
import GoogleOAuthHelper from '@services/GoogleOAuthHelper';
import FacebookOAuthHelper from '@services/FacebookOAuthHelper';
import Ajax from '@services/Ajax';

import position from '@styles/position.css';

export default class extends React.Component {
  constructor(props){
    super(props);

    this.handleLinkToGoogle = this.handleLinkToGoogle.bind(this);
    this.handleLinkToFacebook = this.handleLinkToFacebook.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      googleOAuthReady: false,
      facebookOAuthReady: false,
      facebookProfile: null,
      googleProfile: null,
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      recaptchaResponse: null,
      errors: []
    }

    this.GoogleOAuthHelper = new GoogleOAuthHelper(() => this.setState({googleOAuthReady: true}));
    this.facebookOAuthHelper = new FacebookOAuthHelper(() => this.setState({facebookOAuthReady: true}));
  }
  render() {
    return (
      <Modal show onHide={this.props.onClose}>
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-sm-6">
              <div className={'well ' + position.center} style={{height: 210 + 'px'}}>
              {this.state.googleProfile ?
                <SocialProfile photoUrl={this.state.googleProfile.photoUrl}
                  onUnlink={() => this.setState({googleProfile: null})}
                  site="google"
                  name={this.state.googleProfile.name}/>
                :
                <SocialButton disabled={this.googleOAuthReady} site="google"
                  text="Link to Google" onClick={this.handleLinkToGoogle}
                  style={{paddingTop: 68 + 'px'}}/>
              }
              </div>
            </div>
            <div className="col-sm-6">
              <div className={'well ' + position.center} style={{height: 210 + 'px'}}>
              {this.state.facebookProfile ?
                <SocialProfile photoUrl={this.state.facebookProfile.photoUrl}
                  onUnlink={() => this.setState({facebookProfile: null})}
                  site="facebook"
                  name={this.state.facebookProfile.name}/>
                :
                <SocialButton disabled={this.facebookOAuthReady} site="facebook"
                  text="Link to Facebook" onClick={this.handleLinkToFacebook}
                  style={{paddingTop: 68 + 'px'}}/>
              }
              </div>
            </div>
            <div className="col-sm-8 col-sm-offset-2">

              <TextField name="username" placeholder="Required"
                value={this.state.username}
                onChange={e => this.setState({username: e.target.value})}/>

              <TextField name="email" placeholder="Required"
                value={this.state.email}
                onChange={e => this.setState({email: e.target.value})}/>

              <TextField name="password" label={"Password" + (this.state.facebookProfile || this.state.googleProfile ?
                " (Optional)" : "")} type="password"
                placeholder={this.state.facebookProfile || this.state.googleProfile ?
                "Optional" : "Required"} onChange={this.handlePasswordChange}/>

              <TextField name="confirmPassword" type="password"
                label={"Confirm password" + (this.state.facebookProfile ||
                  this.state.googleProfile ? " (Optional)" : "")}
                placeholder={this.state.facebookProfile || this.state.googleProfile ?
                  "Optional" : "Required"}
                disabled={this.state.password === ""}
                onChange={e => this.setState({passwordConfirm: e.target.value})}
                value={this.state.passwordConfirm}/>

            </div>
            <GRecaptcha className={position.center} onResponse={response => this.setState({recaptchaResponse: response})}/>
            {this.state.errors.length > 0 ? <StatusText className={position.center} type="error" text={this.state.errors}/> : null}
          </Modal.Body>
          <Modal.Footer>
            <div className={position.center}>
              <Button onClick={this.handleSubmit}>Submit</Button>
              <Button onClick={this.props.onClose}>Cancel</Button>
            </div>
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
  handlePasswordChange(e){
    const newState = {
      password: e.target.value
    }
    if(e.target.value === "")
      newState.passwordConfirm = "";
    this.setState(newState);
  }
  handleSubmit(){

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

    const sendData = {};
    sendData.username = this.state.username;
    sendData.password = this.state.password;
    sendData.email = this.state.email;
    sendData.profiles = {};
    sendData.profiles.google = this.state.googleProfile;
    sendData.profiles.facebook = this.state.facebookProfile;
    sendData.recaptchaResponse = this.state.recaptchaResponse;

    Ajax.post({
      url: '/account/register',
      data: sendData,
      response: 'JSON',
      success: response => {
        if(response.errors && response.errors.length > 0){
          this.setState({
            errors: response.errors
          });
          window.grecaptcha.reset();
        } else if (response.actions && response.actions.length > 0){
          this.props.onClose();
        }
      },
      error: info => {
        if(info.xhr.status !== 200)
          return console.error("Ajax request error on login page: " + info.error);
      }
    });
  }
};
