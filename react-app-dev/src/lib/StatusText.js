import React from 'react';
import Center from '@lib/Center';

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

const StatusText = (props) => {
  const status = typeToDetails[props.type];
  let texts = [];
  if(Array.isArray(props.text))
    texts = props.text;
  else if (typeof props.text === 'string' || props.text instanceof String)
    texts = [props.text];
  else
    texts = ["Unspecified error"];

  return (
    <div style={{marginTop: 15 + 'px', marginBottom: 0 + 'px'}} role="alert" className={`alert alert-${status.className}`}>
      {texts.map((text, index) => (
        <span key={text}>
          {index !== 0 ? <br/> : null}
          <span className={`glyphicon glyphicon-${status.icon}-sign`} aria-hidden="true"/>
          <span className="sr-only">{status.prefix}</span>
          {" " + text}
        </span>
      ))}
    </div>
  );
};

StatusText.propTypes = {
  type: React.PropTypes.oneOf(Object.keys(typeToDetails)).isRequired
};
export default StatusText;
