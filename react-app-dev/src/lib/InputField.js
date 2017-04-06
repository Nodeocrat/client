import React from 'react';

import {capitalize} from '@services/StringTools';

export default class InputField extends React.Component {
  render(){
    return (
      <div style={{marginTop: 10 + 'px', marginBottom: 15 + 'px'}}>
        <label>{this.props.label || capitalize(this.props.fieldName)}</label>
        <input type={`${this.props.type || "text"}`}
          className="form-control"
          value={this.props.value}
          placeholder={`${this.props.placeholder || ""}`}
          onChange={this.props.onChange}
          disabled={this.props.disabled || false}/>
      </div>
    );
  }
}
