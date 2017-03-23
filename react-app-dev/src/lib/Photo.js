import React from 'react';
import defaultPhoto from '@media/defaultphoto.png';

export default class Photo extends React.Component {
  static defaultProps = {
    height: 100,
    width: 100,
    url: defaultPhoto,
    color: '#000000'
  }
  render(){
    return (
      <img className="photo-border" height={this.props.height}
        style={{borderRadius: 8 + 'px', borderWidth: 5 + 'px',
          borderStyle: 'solid', borderColor: this.props.color}}
        width={this.props.width} src={this.props.url}/>
    );
  }
};
