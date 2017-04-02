import React from 'react';
import StatusText from '@lib/StatusText';
import Center from '@lib/Center';
import Ajax from '@services/Ajax';
import Panel from 'react-bootstrap/lib/Panel';
import './Profile.css';

class Profile extends React.Component {
  constructor(props){
    super(props);

    const profile = props.profile;
    this.initialState = {
      editMode: false,
      username: profile.username,
      email: profile.email,
      newPassword: "",
      currentPassword: "",
      confirmPassword: ""
    };
    this.state = Object.assign({}, this.initialState, {errors: [], actions: []});

    this.editMode = this.editMode.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleCurrentPasswordChange = this.handleCurrentPasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillReceiveProps(nextProps){
    const profile = nextProps.profile;
    const newState = {};
    if(this.username !== profile.username)
      newState.username = profile.username;
    if(this.email !== profile.email)
      newState.email = profile.email;
    this.initialState = Object.assign({}, this.initialState, {
      username: profile.username,
      email: profile.email
    });
    this.setState(this.initialState);
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
  handleCurrentPasswordChange(e){
    this.setState({
      currentPassword: e.target.value
    });
  }
  handleNewPasswordChange(e){
    const newState = {
      newPassword: e.target.value
    }
    if(e.target.value === "")
      newState.confirmPassword = "";
    this.setState(newState);
  }
  handlePasswordConfirmChange(e){
    this.setState({
      confirmPassword: e.target.value
    });
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

    Ajax.post({
      url: '/account/update',
      data: dataObj,
      response: 'JSON',
      success: (response) => {
        if(response.actions && response.actions.length > 0) {
          this.props.onUserUpdate();
          this.setState({actions: response.actions, errors: []});

        } else if(response.errors && response.errors.length > 0) {
          this.setState({errors: response.errors});
        }
      },
      error: (info) => {
        if(info.xhr.status !== 200)
          return console.error("Ajax request error on account update: " + info.error);
      }
    });
  }
  handleCancel(){
    this.setState(
      Object.assign({}, this.initialState, {errors: []})
    );
  }

  editMode(state){
    this.setState({
      editMode: state,
      actions: []
    });
  }

  render(){
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <div>
            <u className="h4">Account Details</u>
            <button type="button" className="btn-link" style={this.state.editMode ? {display: 'none'} : {borderWidth: 0 + 'px', padding: 0 + 'px', color: 'blue', marginLeft: 8 + 'px'}} onClick={()=>this.editMode(true)}>[Edit]</button>
          </div>
        </div>
        <div className="panel-body">
          <div className="form-group">
            <div>
              Username<input type="text" value={this.state.username} onChange={this.handleUsernameChange} readOnly={!this.state.editMode} className="form-control"/>
            </div>
            <br/>
            <div>
              Email<input type="text" value={this.state.email} readOnly={!this.state.editMode} onChange={this.handleEmailChange} className="form-control"/>
            </div>
            <br/>
            Password
            <div className="panel-group">
              <Panel collapsible expanded={this.state.editMode} header={this.props.profile.passwordSet ? "Password set" : "No password set"}>
                    <div className="form-group" id="password-update-container">
                      {this.props.profile.passwordSet ?
                      (
                        <div>Current password <input value={this.state.currentPassword} onChange={this.handleCurrentPasswordChange} type="password" className="form-control password-update"/><br/></div>
                      ) : null}
                      <div>New password<input readOnly={this.props.profile.passwordSet && this.state.currentPassword === ""} type="password" value={this.state.newPassword} onChange={this.handleNewPasswordChange} className="form-control password-update"/></div>
                      <br/>
                      <div>Confirm new password <input readOnly={this.state.newPassword === "" || (this.props.profile.passwordSet && this.state.currentPassword === "") } type="password" value={this.state.confirmPassword} onChange={this.handlePasswordConfirmChange} className="form-control password-update"/></div>
                    </div>
              </Panel>
            </div>
            {this.state.errors.length > 0 ?
              (<Center><StatusText type="error" text={this.state.errors}/></Center>)
              : null
            }
            {this.state.actions.length > 0 ?
              (<Center><StatusText type="success" text={this.state.actions}/></Center>)
              : null
            }
            <Center>
              <button type="button" className="btn btn-default form-submission" onClick={this.handleSubmit} disabled={!this.state.editMode} style={{marginRight: 10 + 'px'}}>Submit</button>
              <button type="button" className="btn btn-default form-submission" onClick={this.handleCancel} disabled={!this.state.editMode}>Cancel</button>
            </Center>
            <div id="message-container">
            </div>
          </div>
        </div>
      </div>
    );
  }
}
