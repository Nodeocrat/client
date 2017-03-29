import React from 'react';

import {Redirect} from 'react-router-dom';

//react-bootstrap
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

//custom components
import SocialButton from '@components/SocialButton/SocialButton';
import StatusText from '@lib/StatusText';
import Center from '@lib/Center';
import Ajax from '@services/Ajax';

import UrlHelper from '@lib/UrlHelper';

export default class ModalDialog extends React.Component {
  constructor(props){
    super(props);

    this.handleGoogleSignIn = this.handleGoogleSignIn.bind(this);
    this.handleFacebookSignIn = this.handleFacebookSignIn.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this);

    this.state = {
      username: "",
      password: "",
      errors: [],
      show: true
    }
  }
  render() {
    return (
      <Modal show={this.state.show} onHide={this.goBack}>
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{margin: 15 + 'px'}} className="row">
              <div className="col-lg-12">
                <Center>
                  <div>
                    <a href="/api/auth/google">
                      <SocialButton spanParent site="google"
                        text="Sign in with Google"/>
                    </a>
                  </div>
                  <div>
                    <a href="/api/auth/facebook">
                      <SocialButton spanParent site="facebook"
                        text="Sign in with Facebook"/>
                    </a>
                  </div>
                </Center>
              </div>
            </div>
            {
              ((err) => (err ?
                (
                  <Center>
                    <StatusText type="error" text={`That ${err} account is not linked to a Nodeocrat account`}/>
                  </Center>
                )
                :
                null
              ))(UrlHelper.parseQuery(this.props.location.search).err)
            }
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" placeholder="Username"
                    onChange={this.handleUsernameChange}/>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control"
                    placeholder="Password" onChange={this.handlePasswordChange}/>
                </div>
              </div>
            </div>
            {this.state.errors.length > 0 ?
              (<Center><StatusText type="error" text={this.state.errors}/></Center>)
              :
              null
            }
          </Modal.Body>
          <Modal.Footer>
            <Center>
              <Button onClick={this.handleSubmit}>Submit</Button>
              <Button onClick={this.goBack}>Cancel</Button>
            </Center>
          </Modal.Footer>
        </div>
      </Modal>

    );
  }
  goBack(){
    this.props.history.push(UrlHelper.chopOffLast(this.props.match.url));
  }
  handleGoogleSignIn(){
    Ajax.get({
      url: '/auth/google',
      response: 'JSON',
      success: (response) => {
        if(response.errors && response.errors.length > 0){
          this.setState({
            errors: response.errors
          });
        } else if (response.success && response.success.length > 0){
          console.log(JSON.stringify(response.success));
          this.props.history.goBack();
        }
      },
      error: (info) => {
        if(info.xhr.status !== 200)
          return console.error("Ajax request error on login page: " + info.error);
      }
    });
  }
  handleFacebookSignIn(){
    Ajax.get({
      url: '/auth/facebook',
      response: 'JSON',
      success: (response) => {
        if(response.errors && response.errors.length > 0){
          this.setState({
            errors: response.errors
          });
        } else if (response.success && response.success.length > 0){
          console.log(JSON.stringify(response.success));
          this.props.history.goBack();
        }
      },
      error: (info) => {
        if(info.xhr.status !== 200)
          return console.error("Ajax request error on login page: " + info.error);
      }
    });
  }
  handleUsernameChange(e){
    this.setState({
      username: e.target.value
    });
  }
  handlePasswordChange(e){
    this.setState({
      password: e.target.value
    });
  }
  handleSubmit(){
    const sendData = {};

    const errors = [];
    if(!this.state.username)
      errors.push("Username must be provided");
    if(!this.state.password)
      errors.push("Password must be provided");

    if(errors.length > 0)
      return this.setState({ errors: errors});

    sendData.username = this.state.username;
    sendData.password = this.state.password;

    Ajax.post({
      url: '/login/local',
      data: sendData,
      response: 'JSON',
      success: (response) => {
        if(response.errors && response.errors.length > 0){
          this.setState({
            errors: response.errors
          });
        } else if (response.success){
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

ModalDialog.contextTypes = {
  router: React.PropTypes.object
};
