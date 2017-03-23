import React from 'react';
import Center from '@lib/Center';
export default (props) => {

  let texts = [];
  if(Array.isArray(props.text))
    texts = props.text;
  else if (typeof props.text === 'string' || props.text instanceof String)
    texts = [props.text];
  else
    texts = ["Unspecified error"];

  return (
    <div style={{marginTop: 15 + 'px', marginBottom: 0 + 'px'}} role="alert" className="alert alert-danger">
      {texts.map((text, index) => (
        <span key={text}>
          {index !== 0 ? <br/> : null}
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"/>
          <span className="sr-only">Error: </span>
          {" " + text}
        </span>
      ))}
    </div>
  );
};
