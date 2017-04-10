import React from 'react';
import './SocialButton.css';
import socialFonts from '@fonts/icons/icons.css';
import ColorSchemes from '@global/ColorSchemes';

const siteToIcon = {
  "facebook": "icon-facebook",
  "google": "icon-gplus",
  "linkedin": "icon-linkedin",
  "github": "icon-github"
};

const SocialButton = (props) => (
  <button disabled={props.disabled} type="button" className={`btn social-login-btn ${props.spanParent ? 'span-parent' : null}`} style={{backgroundColor: ColorSchemes[props.site]}} onClick={props.onClick}>
    <span className={`btn-icon ${socialFonts[siteToIcon[props.site]]}`}/>
    <span>
      <span className="separator"></span>
      <span className="social-btn-text">{props.text}</span>
    </span>
  </button>
);
SocialButton.propTypes = {
  site: React.PropTypes.oneOf(Object.keys(siteToIcon)).isRequired,
  text: React.PropTypes.string.isRequired
};

const SocialSymbol = (props) => {
  const style = props.style || {};
  style.backgroundColor = ColorSchemes[props.site];

  return (
    <button disabled={props.disabled} type="button" className={`btn social-login-btn ${props.spanParent ? 'span-parent' : null}`} style={style} onClick={props.onClick}>
      <span className={`btn-icon ${socialFonts[siteToIcon[props.site] + '-symbol']}`}></span>
    </button>
  );
};
SocialSymbol.propTypes = {
  site: React.PropTypes.oneOf(Object.keys(siteToIcon)).isRequired
};

export {SocialButton as default, SocialSymbol};
