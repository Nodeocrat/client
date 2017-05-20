import React from 'react';

import {withRouter} from 'react-router-dom';

//react-bootstrap
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

//custom components
import SocialButton from '@lib/SocialButton/SocialButton';
import StatusText from '@lib/StatusText';
import TextField from '@lib/TextField';
import Ajax from '@services/Ajax';
import UrlHelper from '@services/UrlHelper';

//styles
import position from '@styles/position.css';

class LoginDialog extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: "",
      password: "",
      errors: []
    }
  }
  render() {
    return (
      <Modal show onHide={this.props.onClose}>
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={position.center}>
              <div style={{margin: 15 + 'px', display: 'inline-block'}}>
                <a href="/api/auth/google">
                  <SocialButton spanParent site="google"
                    text="Sign in with Google"/>
                </a>
                <a href="/api/auth/facebook">
                  <SocialButton spanParent site="facebook"
                    text="Sign in with Facebook"/>
                </a>
              </div>
            </div>
            {
              (err => (err ?
                <StatusText className={position.center} type="error" text={`That ${err} account is not linked to a Nodeocrat account`}/> : null
              ))(UrlHelper.parseQuery(this.props.location.search).loginErr)
            }
            <div className="row">
              <div className="col-sm-offset-2 col-sm-8">
                <TextField name="username" placeholder="Username"
                  onChange={(e) => {this.setState({username: e.target.value})}}/>
                <TextField name="password" placeholder="Password" type="password"
                  onChange={(e) => {this.setState({password: e.target.value})}}/>
              </div>
            </div>
            {this.state.errors.length > 0 ?
              <StatusText className={position.center} type="error" text={this.state.errors}/> : null
            }
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
      url: '/auth/local/login',
      data: sendData,
      response: 'JSON',
      success: (response) => {
        if(response.errors && response.errors.length > 0){
          this.setState({
            errors: response.errors
          });
        } else if (response.success){
          console.log(JSON.stringify(this.props));
          console.log(this.props);
          this.props.onLogin();
          this.props.onClose();
        }
      },
      error: (info) => {
        if(info.xhr.status !== 200)
          return console.error("Ajax request error on login page: " + info.error);
      }
    });
  }
};

export default withRouter(LoginDialog);
