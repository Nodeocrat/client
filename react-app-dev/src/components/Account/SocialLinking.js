import React from 'react';
import Ajax from '@services/Ajax';
import SocialButton from '@lib/SocialButton/SocialButton';
import SocialProfile from '@components/OAuth/SocialProfile';
import StatusText from '@lib/StatusText';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '@actions/userActions';
import {propExists} from '@services/JSTools';

import text from '@styles/text.css';
import position from '@styles/position.css';

class SocialLinking extends React.Component {
  constructor(props){
    super(props);
    this.state = {facebookErrors: [], googleErrors: []};
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
              propExists(this.props, 'linkedProfiles.google.id') ?
                <SocialProfile
                  photoUrl={this.props.linkedProfiles.google.photoUrl}
                  onUnlink={()=>this.props.actions.unlink("google")}
                  site="google"
                  name={this.props.linkedProfiles.google.name}/>
                :
                <div style={{paddingTop: 68 + 'px'}}>
                  <SocialButton
                    className={position.center}
                    site="google"
                    text="Link to Google"
                    onClick={()=>this.props.actions.link("google")}/>
                </div>
            }
            </div>
            {this.state.googleErrors.length > 0 ?
              <StatusText type="error" text={this.state.googleErrors}/> : null
            }
          </div>
          <div className="col-sm-6">
            <div className="well" style={{paddingLeft: 14 + 'px', paddingRight: 14 + 'px', height: 210 + 'px'}}>
            {
              propExists(this.props, 'linkedProfiles.facebook.id') ?
                <SocialProfile
                  photoUrl={this.props.linkedProfiles.facebook.photoUrl}
                  onUnlink={()=>this.props.actions.unlink("facebook")}
                  site="facebook"
                  name={this.props.linkedProfiles.facebook.name}/>
                :
                <div style={{paddingTop: 68 + 'px'}}>
                  <SocialButton
                    className={position.center}
                    site="facebook"
                    text="Link to Facebook"
                    onClick={()=>this.props.actions.link("facebook")}/>
                </div>
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

function mapStateToProps(state, ownProps){
  return {
    linkedProfiles: state.user.linkedProfiles
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialLinking);
