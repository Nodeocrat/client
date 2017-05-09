import React from 'react';

//components
import Photo from '@lib/Photo';
import Button from 'react-bootstrap/lib/Button';

//styles
import position from '@styles/position.css';
import siteColors from '@styles/colors/sites.css';

//services
import {capitalize} from '@services/StringTools';

const SocialProfile = (props) => (
  <div>
    <div className={position.center}><label>Linked with {capitalize(props.site)}</label></div>
    <div className={position.center}><Button bsStyle="link" style={{padding: 1 + 'px'}} onClick={props.onUnlink}>(Unlink)</Button></div>
    <div className={position.center}><Photo url={props.photoUrl} color={siteColors[props.site]}/></div>
    <div className={position.center}>{props.name}</div>
  </div>
);

SocialProfile.propTypes = {
  site: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  photoUrl: React.PropTypes.string.isRequired,
  onUnlink: React.PropTypes.func.isRequired
}

export default SocialProfile;
