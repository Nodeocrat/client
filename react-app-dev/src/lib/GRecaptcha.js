import React from 'react';
import ScriptLoader from '@services/ScriptLoader';
import SiteConfig from '@global/SiteConfig';

export default class GRecaptcha extends React.Component {
  constructor(props){
    super(props);
    window.greOnloadCallback = function(){
      window.grecaptcha.render("g-recaptcha", {
        'sitekey' : SiteConfig.gRecaptchaKey,
        'callback' : props.onResponse
      });
    }
    ScriptLoader([
      "https://www.google.com/recaptcha/api.js?onload=greOnloadCallback&render=explicit"
    ]);
  }
  render(){
    return (
      <div className={this.props.className}>
        <div style={{display: 'inline-block'}} id="g-recaptcha"/>
      </div>
    );
  }
};

GRecaptcha.propTypes = {
  onResponse: React.PropTypes.func.isRequired
};
