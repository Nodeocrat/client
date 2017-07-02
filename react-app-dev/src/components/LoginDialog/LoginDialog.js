import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import * as userActions from '@actions/userActions';
import * as loginActions from '@actions/loginActions';

//react-bootstrap
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

//custom components
import SocialButton, {TextBtn} from '@lib/SocialButton/SocialButton';
import StatusText from '@lib/StatusText';
import TextField from '@lib/TextField';
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
      show: true
    }
  }

  onClose(){
    this.setState({show: false});
    if(this.props.onClose)
      this.props.onClose();
  }

  render() {
    //if (this.props.loggedIn) this.props.onClose();
    const loginErr = UrlHelper.parseQuery(this.props.location.search).loginErr;
    let err = null;

    if(this.props.error){
      err = this.props.error;
    } else if(loginErr)
      err = `That ${loginErr} account is not linked to a Nodeocrat account`;


    return (
      <Modal show={!this.props.loggedIn && this.state.show} onHide={this.props.onClose}>
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
               err ?
                <StatusText className={position.center} type="error" text={err}/> : null
            }
            <div className={position.center}>
              <div style={{margin: 15 + 'px', display: 'inline-block'}}>
                <TextBtn spanParent onClick={this.props.actions.guestLogin} color='white' backgroundColor='#999' text='Continue as guest'/>
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
            <div className="row">
              <div className="col-sm-offset-2 col-sm-8">
                <TextField name="username" placeholder="Username"
                  onChange={(e) => {this.setState({username: e.target.value})}}/>
                <TextField name="password" placeholder="Password" type="password"
                  onChange={(e) => {this.setState({password: e.target.value})}}/>
              </div>
            </div>
            {this.props.errors.other && this.props.errors.other.length > 0 ?
              <StatusText className={position.center} type="error" text={this.props.errors.other}/> : null
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
  componentWillUnmount(){
    this.props.actions.loginDialogClosed();
  }
  handleSubmit(){
    const errors = [];
    if(!this.state.username)
      errors.push("Username must be provided");
    if(!this.state.password)
      errors.push("Password must be provided");

    if(errors.length > 0)
      return this.props.actions.localLoginError(errors);

    this.props.actions.localLogin(this.state.username, this.state.password);
  }
};

function mapStateToProps(state, ownProps){
  return {
    loggedIn: state.user.profile ? true : false,
    ...state.login
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({...userActions, ...loginActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginDialog));
