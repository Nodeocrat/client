import React from 'react';
import './SocialButton.css';
import '@fonts/social-fonts/fontello.css';
import ColorSchemes from '@global/ColorSchemes';

const siteToIcon = {
  "facebook": "icon-facebook",
  "google": "icon-gplus"
}

const SocialButton = (props) => (
  <button disabled={props.disabled} type="button" className={`btn social-login-btn ${props.spanParent ? 'span-parent' : null}`} style={{backgroundColor: ColorSchemes[props.site]}} onClick={props.onClick}>
    <span className={"btn-icon " + siteToIcon[props.site]}></span>
    <span className="separator"></span>
    <span className="social-btn-text">{props.text}</span>
  </button>
);

SocialButton.propTypes = {
  text: React.PropTypes.string.isRequired,
  site: React.PropTypes.oneOf(Object.keys(siteToIcon)).isRequired
}

export default SocialButton;
