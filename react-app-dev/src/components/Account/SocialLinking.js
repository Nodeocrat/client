import React from 'react';
import GoogleOAuthHelper from '@services/GoogleOAuthHelper';
import FacebookOAuthHelper from '@services/FacebookOAuthHelper';
import Ajax from '@services/Ajax';
import SocialButton from '@components/SocialButton/SocialButton';
import SocialProfile from '@components/OAuth/SocialProfile';
import Center from '@lib/Center';
import StatusText from '@lib/StatusText';

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
          <div><u className="h4">Account linking</u></div>
        </div>
        <div className="panel-body">
          <div className="col-md-6">
            <div className="well" style={{paddingLeft: 14 + 'px', paddingRight: 14 + 'px', height: 210 + 'px'}}>
            {
              this.props.socialProfiles.google && this.props.socialProfiles.google.id ?
                (
                  <SocialProfile photoUrl={this.props.socialProfiles.google.photoUrl}
                    onUnlink={this.handleGoogleUnlink} site="google"
                    name={this.props.socialProfiles.google.name}/>
                )
                :
                (
                  <div style={{paddingTop: 68 + 'px'}}>
                    <Center><SocialButton site="google"
                      text="Link to Google" onClick={this.handleLinkToGoogle}/></Center>
                  </div>
                )
            }
            </div>
            {this.state.googleErrors.length > 0 ?
              <StatusText type="error" text={this.state.googleErrors}/> : null
            }
          </div>
          <div className="col-md-6">
            <div className="well" style={{paddingLeft: 14 + 'px', paddingRight: 14 + 'px', height: 210 + 'px'}}>
            {
              this.props.socialProfiles.facebook && this.props.socialProfiles.facebook.id ?
                (
                  <SocialProfile photoUrl={this.props.socialProfiles.facebook.photoUrl}
                    onUnlink={this.handleFacebookUnlink} site="facebook"
                    name={this.props.socialProfiles.facebook.name}/>
                )
                :
                (
                  <div style={{paddingTop: 68 + 'px'}}>
                    <Center><SocialButton site="facebook"
                      text="Link to Facebook" onClick={this.handleLinkToFacebook}/></Center>
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
