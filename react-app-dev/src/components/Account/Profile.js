import React from 'react';
import StatusText from '@lib/StatusText';
import Panel from 'react-bootstrap/lib/Panel';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '@actions/userActions';
import * as accountActions from '@actions/accountActions';

//styles
import './Profile.css';
import position from '@styles/position.css';
import text from '@styles/text.css';

//props: expanded, currentPassword, newPassword, confirmPassword
const PasswordEdit = props => (
  <section>
    Password
    <div className="panel-group">
      <Panel collapsible expanded={props.expand} header={props.passwordSet ? "Password set" : "No password set"}>
        <div className="form-group" id="password-update-container">
          {props.passwordSet ?
          (
            <div>
              Current password
              <input value={props.currentPassword}
                onChange={props.onCurrentPasswordChange}
                type="password" className="form-control password-update"/>
              <br/>
            </div>
          ) : null}
          <div>
            New password
            <input readOnly={props.passwordSet && props.currentPassword === ""} type="password" value={props.newPassword} onChange={props.onNewPasswordChange} className="form-control password-update"/>
          </div>
          <br/>
          <div>
            Confirm new password
            <input readOnly={props.newPassword === "" || (props.passwordSet && props.currentPassword === "")}
              type="password" value={props.confirmPassword}
              onChange={props.onConfirmPasswordChange}
              className="form-control password-update"/>
          </div>
        </div>
      </Panel>
    </div>
  </section>
);

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.initialFieldValues = this.initialFieldValues.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = this.initialFieldValues();
  }

  initialFieldValues(){
    const profile = this.props.profile;
    return {
      username: profile.username,
      email: profile.email,
      newPassword: "",
      currentPassword: "",
      confirmPassword: ""
    };
  }

  handleNewPasswordChange(e){
    const newState = {
      newPassword: e.target.value
    }
    if(e.target.value === "")
      newState.confirmPassword = "";
    this.setState(newState);
  }
  handleSubmit(){
    const dataObj = {};
    const newEmail = this.state.email;
    const newUsername = this.state.username;
    const newPassword = this.state.newPassword;
    const confirmPassword = this.state.confirmPassword;
    const currentPassword = this.state.currentPassword;

    if(newPassword || confirmPassword){
      if(newPassword !== confirmPassword)
        return this.setState({errors: ["New password and password confirmation do not match"]});

      if(this.props.profile.passwordSet){
        if(currentPassword === "")
          return this.setState({errors: ["Must enter current password"]});
        else
          dataObj.currentPassword = currentPassword;
      }
    }

    dataObj.email = newEmail;
    dataObj.username = newUsername;
    dataObj.newPassword = newPassword;

    this.props.actions.updateProfile(dataObj);
  }

  handleCancel(){
    this.props.actions.exitProfileEditMode();
    this.setState(this.initialFieldValues());
  }

  render(){
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <span className={`${text.subTitle}`}>Account Details</span>
          <button type="button" className="btn-link" style={this.props.editMode ? {display: 'none'} : {borderWidth: 0 + 'px', padding: 0 + 'px', color: 'blue', marginLeft: 8 + 'px'}} onClick={this.props.actions.enterProfileEditMode}>[Edit]</button>
        </div>
        <div className="panel-body">
          <div className="form-group">
            <div>
              Username
              <input type="text" value={this.state.username}
                onChange={(e)=>{this.setState({username: e.target.value})}}
                readOnly={!this.props.editMode} className="form-control"/>
            </div>
            <br/>
            <div>
              Email<input type="text" value={this.state.email} readOnly={!this.props.editMode}
              onChange={(e)=>{this.setState({email: e.target.value})}}
              className="form-control"/>
            </div>
            <br/>
            <PasswordEdit
              onCurrentPasswordChange={(e)=>{this.setState({currentPassword: e.target.value})}}
              passwordSet={this.props.profile.passwordSet}
              expand={this.props.editMode}
              currentPassword={this.state.currentPassword}
              newPassword={this.state.newPassword}
              onNewPasswordChange={this.handleNewPasswordChange}
              confirmPassword={this.state.confirmPassword}
              onConfirmPasswordChange={(e)=>{this.setState({confirmPassword: e.target.value})}}
            />
            {this.props.errors.other && this.props.errors.other.length > 0 ?
              <StatusText type="error" text={this.props.errors.other}/> : null}
            {this.props.actions.length > 0 ?
              <StatusText type="success" text={this.props.actions}/> : null}
            <div className={position.center}>
              <button type="button" className="btn btn-default form-submission" onClick={this.handleSubmit} disabled={!this.props.editMode} style={{marginRight: 10 + 'px'}}>Submit</button>
              <button type="button" className="btn btn-default form-submission" onClick={this.handleCancel} disabled={!this.props.editMode}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    profile: state.user.profile,
    ...state.account.profile
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({...userActions, ...accountActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
