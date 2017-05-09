import React from 'react';
import GoogleOAuthHelper from '@services/GoogleOAuthHelper';
import FacebookOAuthHelper from '@services/FacebookOAuthHelper';
import Ajax from '@services/Ajax';
import SocialButton from '@lib/SocialButton/SocialButton';
import SocialProfile from '@components/OAuth/SocialProfile';
import StatusText from '@lib/StatusText';

import text from '@styles/text.css';
import position from '@styles/position.css';

export default class SocialLinking extends React.Component {
  constructor(props){
    super(props);

    this.handleLinkToGoogle = this.handleLinkToGoogle.bind(this);
    this.handleGoogleUnlink = this.handleGoogleUnlink.bind(this);
    this.handleLinkToFacebook = this.handleLinkToFacebook.bind(this);
    this.handleFacebookUnlink = this.handleFacebookUnlink.bind(this);

    this.GoogleOAuthHelper = new GoogleOAuthHelper();
    this.FacebookOAuthHelper = new FacebookOAuthHelper();

    this.state = {facebookErrors: [], googleErrors: []};

  }
  handleLinkToFacebook(){
    this.FacebookOAuthHelper.signIn({
      success: (profile) => {

        Ajax.post({
          url: "/account/link/facebook",
          data: {profile: profile},
          response: 'JSON',
          success: (response) => {
            if(response.actions && response.actions.length > 0) {
              this.props.onUserUpdate();
              this.setState({facebookErrors: []});

            } else if(response.errors && response.errors.length > 0) {
              this.setState({facebookErrors: response.errors});
            }
          },
          error: (info) => {
            if(info.xhr.status !== 200)
              return console.error("Ajax request error on login page: " + info.error);
          }
        });
      },
      error: (reason) => {
        // Errorrs are handled well enough by the client for now
      }
    });
  }
  handleFacebookUnlink(){
    Ajax.post({
      url: "/account/unlink/facebook",
      response: 'JSON',
      success: (response) => {
        if(response.actions && response.actions.length > 0) {
          this.props.onUserUpdate();
          this.setState({facebookErrors: []});

        } else if(response.errors && response.errors.length > 0) {
          this.setState({facebookErrors: response.errors});
        }
      },
      error: (info) => {
        if(info.xhr.status !== 200)
          return console.error("Ajax request error on login page: " + info.error);
      }
    });
  }
  handleLinkToGoogle(){
    this.GoogleOAuthHelper.signIn({
      success: (profile) => {

        Ajax.post({
          url: "/account/link/google",
          data: {profile: profile},
          response: 'JSON',
          success: (response) => {
            if(response.actions && response.actions.length > 0) {
              this.props.onUserUpdate();
              this.setState({googleErrors: []});

            } else if(response.errors && response.errors.length > 0) {
              this.setState({googleErrors: response.errors});
            }
          },
          error: (info) => {
            if(info.xhr.status !== 200)
              return console.error("Ajax request error on login page: " + info.error);
          }
        });
      },
      error: (reason) => {
        // Errorrs are handled well enough by the client for now
      }
    });
  }
  handleGoogleUnlink(){
    Ajax.post({
      url: "/account/unlink/google",
      response: 'JSON',
      success: (response) => {
        if(response.actions && response.actions.length > 0) {
          this.props.onUserUpdate();
          this.setState({googleErrors: []});

        } else if(response.errors && response.errors.length > 0) {
          this.setState({googleErrors: response.errors});
        }
      },
      error: (info) => {
        if(info.xhr.status !== 200)
          return console.error("Ajax request error on login page: " + info.error);
      }
    });
  }
  render(){
    return (
      <div id="facebook-details" className="panel panel-info">
        <div className="panel-heading">
          <span className={`${text.subTitle}`}>Account Details</span>
        </div>
        <div className="panel-body">
          <div className="col-sm-6">
            <div className="well" style={{paddingLeft: 14 + 'px', paddingRight: 14 + 'px', height: 210 + 'px'}}>
            {
              this.props.linkedProfiles.google && this.props.linkedProfiles.google.id ?
                (
                  <SocialProfile photoUrl={this.props.linkedProfiles.google.photoUrl}
                    onUnlink={this.handleGoogleUnlink} site="google"
                    name={this.props.linkedProfiles.google.name}/>
                )
                :
                (
                  <div style={{paddingTop: 68 + 'px'}}>
                    <SocialButton className={position.center} site="google"
                      text="Link to Google" onClick={this.handleLinkToGoogle}/>
                  </div>
                )
            }
            </div>
            {this.state.googleErrors.length > 0 ?
              <StatusText type="error" text={this.state.googleErrors}/> : null
            }
          </div>
          <div className="col-sm-6">
            <div className="well" style={{paddingLeft: 14 + 'px', paddingRight: 14 + 'px', height: 210 + 'px'}}>
            {
              this.props.linkedProfiles.facebook && this.props.linkedProfiles.facebook.id ?
                (
                  <SocialProfile photoUrl={this.props.linkedProfiles.facebook.photoUrl}
                    onUnlink={this.handleFacebookUnlink} site="facebook"
                    name={this.props.linkedProfiles.facebook.name}/>
                )
                :
                (
                  <div style={{paddingTop: 68 + 'px'}}>
                    <SocialButton className={position.center} site="facebook"
                      text="Link to Facebook" onClick={this.handleLinkToFacebook}/>
                  </div>
                )
            }
            </div>
            {this.state.facebookErrors.length > 0 ?
              <StatusText type="error" text={this.state.facebookErrors}/> : null
            }
          </div>
        </div>
      </div>
    );
  }
}
