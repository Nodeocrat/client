import React from 'react';
import {capitalize} from '@services/StringTools';

export default class extends React.Component {
  render(){
    const {label, fieldName, className, ...otherProps} = this.props;
    return (
      <div style={{marginTop: 10 + 'px', marginBottom: 15 + 'px'}}>
        <label>{label || capitalize(fieldName)}</label>
        <input type={`${this.props.type || "text"}`}
          className={"form-control " + className}
          {...otherProps}/>
      </div>
    );
  }
}
