import React from 'react';
import './SocialButton.css';
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

export {SocialButton as default, SocialSymbol};
