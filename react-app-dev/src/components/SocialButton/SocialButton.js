import React from 'react';
import './SocialButton.css';
import socialFonts from '@fonts/icons/icons.css';
import ColorSchemes from '@global/ColorSchemes';

const SocialButton = (props) => (
  <button disabled={props.disabled} type="button" className={`btn social-login-btn ${props.spanParent ? 'span-parent' : null} ${socialFonts[props.site + '-btn']}`} onClick={props.onClick}>
    <span className={`btn-icon ${socialFonts["icon-" + props.site]}`} style={{marginTop: 3 + 'px'}}/>
    <span>
      <span className="separator"></span>
      <span className="social-btn-text">{props.text}</span>
    </span>
  </button>
);
SocialButton.propTypes = {
  text: React.PropTypes.string.isRequired
};

const SocialSymbol = (props) => (
  <button disabled={props.disabled} type="button" className={`btn social-login-btn ${props.spanParent ? 'span-parent' : null} ${socialFonts[props.site + '-btn-textless']}`} style={props.style} onClick={props.onClick}>
    <span className={`btn-icon ${socialFonts['icon-' + props.site + '-textless']}`}></span>
  </button>
);

export {SocialButton as default, SocialSymbol};
