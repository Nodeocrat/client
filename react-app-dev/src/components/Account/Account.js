import React from 'react';
import StatusText from '@lib/StatusText';
import SocialLinking from './SocialLinking';
import Profile from './Profile';

export default () => (
  <section className="well">
    <div className="row">
      <div className="col-md-5">
        <Profile/>
      </div>
      <div className="col-md-7">
        <SocialLinking/>
      </div>
    </div>
  </section>
);
