import React, { Component } from 'react';
import './SocialButton.css';
import '@fonts/social-fonts/fontello.css';

class SocialButton extends Component {
  render() {
    let colorScheme = null;
    let icon = null;
    if(this.props.type == "facebook") {
      colorScheme = "facebook-bg-color";
      icon = "icon-facebook";
    } else if (this.props.type == "google") {
      colorScheme = "google-bg-color";
      icon = "icon-gplus";
    } else {
      colorScheme = "";
      icon = "";
    }

    return (
      <button type="button" className={"btn social-login-btn " + colorScheme} onClick={() => this.props.onClick}>
        <span className={"btn-icon " + icon}></span>
        <span className="separator"></span>
        <span className="social-btn-text">{this.props.text}</span>
      </button>
    );
  }
}

export default SocialButton;
