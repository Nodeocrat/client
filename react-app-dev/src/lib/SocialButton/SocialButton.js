import React from 'react';
import {guestLogin} from './SocialButton.css';
import socialFonts from '@fonts/icons/icons.css';

const SocialButton = (props) => {
  const {spanParent, disabled, site, onClick, text, ...otherProps} = props;
  return (
    <div {...otherProps}>
      <button disabled={disabled} type="button" className={`btn social-login-btn ${spanParent ? 'span-parent' : null} ${socialFonts[site + '-btn']}`} onClick={onClick}>
        <span className={`btn-icon ${socialFonts["icon-" + site]}`} style={{marginTop: 3 + 'px'}}/>
        <span>
          <span className="separator"></span>
          <span className="social-btn-text">{text}</span>
        </span>
      </button>
    </div>
  );
};
SocialButton.propTypes = {
  text: React.PropTypes.string.isRequired
};

const SocialSymbol = (props) => (
  <button disabled={props.disabled} type="button" className={`btn social-login-btn ${props.spanParent ? 'span-parent' : null} ${socialFonts[props.site + '-btn-textless']}`} style={props.style} onClick={props.onClick}>
    <span className={`btn-icon ${socialFonts['icon-' + props.site + '-textless']}`}></span>
  </button>
);

const TextBtn = props => {
  const {color, backgroundColor, spanParent, disabled, onClick, text, ...otherProps} = props;
  return (
    <div {...otherProps}>
      <button disabled={disabled} type="button" className={`btn social-login-btn ${guestLogin} ${spanParent ? 'span-parent' : null}`} onClick={onClick} style={{color, backgroundColor}}>
        <span className="social-btn-text">{text}</span>
      </button>
    </div>
  );
};
TextBtn.propTypes = {
  text: React.PropTypes.string.isRequired
};

export {SocialButton as default, SocialSymbol, TextBtn};
