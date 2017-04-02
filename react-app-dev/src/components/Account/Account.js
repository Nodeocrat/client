import React from 'react';
import StatusText from '@lib/StatusText';
import SocialLinking from './SocialLinking';
import Profile from './Profile';

// Get User prop in here.
// If no user present, render AlertText.



export default (props) => (

  props.user.signedIn ?
  (
    <div className="well">
      <div className="row">
        <div className="col-md-5">
          <Profile onUserUpdate={props.user.updateUser} profile={props.user.profile}/>
        </div>
        <div className="col-md-7">
          <SocialLinking linkedProfiles={props.user.linkedProfiles} onUserUpdate={props.user.updateUser}/>
        </div>
      </div>
    </div>
  ) : (
    <StatusText type="error" text="You must be logged in to view this page"/>
  )
);
