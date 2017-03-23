import React from 'react';

import Photo from '@lib/Photo';
import Center from '@lib/Center';
import ColorSchemes from '@global/ColorSchemes';

import Button from 'react-bootstrap/lib/Button';

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//TODO if no text supplied just return a button with the site icon
const SocialProfile = (props) => (
  <div>
    <Center><label>Linked with {capitalize(props.site)}</label></Center>
    <Center><Button bsStyle="link" style={{padding: 1 + 'px'}} onClick={props.onUnlink}>(Unlink)</Button></Center>
    <Center><Photo url={props.photoUrl} color={ColorSchemes[props.site]}/></Center>
    <Center>{props.name}</Center>
  </div>
);

SocialProfile.propTypes = {
  site: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  photoUrl: React.PropTypes.string.isRequired,
  onUnlink: React.PropTypes.func.isRequired
}

export default SocialProfile;


//<button type='button' onClick={props.onUnlink} className='link-button'>(Unlink)</button>
