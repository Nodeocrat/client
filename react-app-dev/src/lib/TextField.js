import React from 'react';
import {capitalize} from '@services/StringTools';

export default class extends React.PureComponent {
  render(){
    const {label, name, className, ...otherProps} = this.props;
    return (
      <div style={{marginTop: 10 + 'px', marginBottom: 15 + 'px'}}>
        <label htmlFor={name}>{label || capitalize(name)}</label>
        <input type={`${this.props.type || "text"}`}
          className={"form-control " + className}
          name={name}
          {...otherProps}/>
      </div>
    );
  }
}
