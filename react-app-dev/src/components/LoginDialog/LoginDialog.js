import React from 'react';

import {withRouter} from 'react-router-dom';

//react-bootstrap
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

//custom components
import SocialButton from '@components/SocialButton/SocialButton';
import StatusText from '@lib/StatusText';
import Center from '@lib/Center';
import InputField from '@lib/InputField';
import Ajax from '@services/Ajax';
import UrlHelper from '@services/UrlHelper';

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
              ))(UrlHelper.parseQuery(this.props.location.search).loginErr)
            }
            <div className="row">
              <div className="col-sm-offset-2 col-sm-8">
                <InputField fieldName="username" placeholder="Username"
                  onChange={(e) => {this.setState({username: e.target.value})}}/>
                <InputField fieldName="password" placeholder="Password" type="password"
                  onChange={(e) => {this.setState({password: e.target.value})}}/>
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
              <Button onClick={this.props.onClose}>Cancel</Button>
            </Center>
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
