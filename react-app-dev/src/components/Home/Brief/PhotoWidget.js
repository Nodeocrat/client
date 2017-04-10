import React from 'react';
import {SocialSymbol} from '@components/SocialButton/SocialButton';
import Center from '@lib/Center';

//services
import {offsetFromParent} from '@services/DOMTools';

export default class PhotoWidget extends React.Component {

  constructor(props){
      super(props);

      this.state = {
        coords: []
      };
      this.updateCoords = this.updateCoords.bind(this);
  }

  render(){
    let linkedinIcon = null;
    let githubIcon = null;

    if(this.state.coords && this.state.coords.length === 2){

      const gitStyle = {
        position: 'absolute',
        top: this.state.coords[0].y - 15,
        left: this.state.coords[0].x - 15,
        borderWidth: 4 + 'px',
        borderColor: '#f5f5f5'
      };
      githubIcon = (<SocialSymbol style={gitStyle} site="github"/>);

      const linkedinStyle = {
        position: 'absolute',
        top: this.state.coords[1].y - 14.5,
        left: this.state.coords[1].x - 14.5,
        borderWidth: 3 + 'px',
        borderColor: '#f5f5f5'
      }
      linkedinIcon = (<SocialSymbol style={linkedinStyle} site="linkedin"/>);
    }
    return (
      <Center>
        <img
          src="https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/11006395_10205842529126734_4431426595515210786_n.jpg?oh=d90b7e376e9f86c2475387fb49d85e73&oe=599948DF"
          style={{borderRadius: 100 + 'px', marginBottom: 20 + 'px'}}
          height="150" width="150" id="home-profile-img"/>
          <br/>
          {githubIcon ? githubIcon : null}
          {linkedinIcon ? linkedinIcon : null}
      </Center>
    );
  }

  updateCoords(){
    const imgEle = window.document.getElementById('home-profile-img');
    const coords = this.getCoords(imgEle, 2, null, 0.09);
    this.setState({coords: coords});
  }

  componentDidMount(){
    window.addEventListener("resize", this.updateCoords);
    this.updateCoords();
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.updateCoords);
  }

  // Function which calculates center coordinates of element, relative to
  // the parent, and returns {numItems} coordinates which are positions,
  // {inputSpread}*2*PI radians apart from each other around midTheta, around
  // a circular circumference of {element}, with radius element.width/2.
  getCoords(element, numItems, midTheta, inputSpread){

    if(!numItems || !element)
      return null;

    const returnCoords = [];
    const theta = midTheta || 0.875;
    const spread = inputSpread || 0.1;

    // Obtain center of element & radius
    const x0 = offsetFromParent(element).x;
    const y0 = offsetFromParent(element).y;
    const height = element.height;
    const width = element.width;
    const originX = x0 + 0.5*width;
    const originY = y0 + 0.5*height;
    const radius = width/2;

    // Formula for polar coordinates -> cartesian coordinates around
    // (originX, originY) with inverted y-axis
    // x = originX + r × cos( θ )
    // y = originY - r × sin( θ )
    for(let i = 0; i < numItems; i++){
      const thetaI = (theta + spread*(i + 0.5*(1-numItems)))*2*Math.PI;
      returnCoords.push(
        {
          x: originX + radius*Math.cos(thetaI),
          y: originY - radius*Math.sin(thetaI)
        });
    }

    return returnCoords;

  }
}
