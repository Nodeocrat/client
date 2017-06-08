import React from 'react';
import text from '@styles/text.css';

const typeToDetails = {
  error: {
    icon: "exclamation",
    prefix: "Error: ",
    className: "danger"
  },
  success: {
    icon: "ok",
    prefix: "Success: ",
    className: "success"
  }
}

const StatusText = props => {
  const {type, text, ...otherProps} = props;
  const status = typeToDetails[type];
  let texts = [];
  if(Array.isArray(text))
    texts = text;
  else if (typeof text === 'string' || text instanceof String)
    texts = [text];
  else
    texts = ["Unspecified error"];

  return (
    <div {...otherProps}>
      <div style={{display: 'inline-block', marginTop: 12 + 'px', marginBottom: 12 + 'px'}} role="alert" className={`alert alert-${status.className} ${text.left}`}>
        {texts.map((text, index) => (
          <span key={text}>
            {index !== 0 ? <br/> : null}
            <span className={`glyphicon glyphicon-${status.icon}-sign`} aria-hidden="true"/>
            <span className="sr-only">{status.prefix}</span>
            {" " + text}
          </span>
        ))}
      </div>
    </div>
  );
};

StatusText.propTypes = {
  type: React.PropTypes.oneOf(Object.keys(typeToDetails)).isRequired
};
export default StatusText;
