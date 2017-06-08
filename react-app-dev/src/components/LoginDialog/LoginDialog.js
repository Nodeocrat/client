import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import * as userActions from '@actions/userActions';

//react-bootstrap
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

//custom components
import SocialButton from '@lib/SocialButton/SocialButton';
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
      password: ""
    }
  }
  
  render() {
    //if (this.props.loggedIn) this.props.onClose();
    return (
      <Modal show={!this.props.loggedIn} onHide={this.props.onClose}>
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
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginDialog));
