import React from 'react';
import ReactDOM from 'react-dom';
import * as popup from './popup.css';

//Idea's of popup 'hooking' onto elements outside of render tree borrowed from
// https://joecritchley.svbtle.com/portals-in-reactjs
//This class is designed to be a convenient popup which can hook onto any elemetn
//for which the id has provided. Warning: The elements parent must have position: relative.
//Then the popup will center (vertically and horizontally) inside the parent, whilst
//graying out the background.
export default class Popup extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      dimensions: {width: 0, height: 0}
    };

    this._updateParentDimensions = this._updateParentDimensions.bind(this);
  }

	componentWillUnmount() {
		this._unrenderLayer();
		if(!this.props.portal) window.document.body.removeChild(this._target);
    window.removeEventListener("resize", this._updateParentDimensions);
	}

	componentDidUpdate() {
		this._renderLayer();
	}

	componentDidMount() {
		if(this.props.portal) {
			this._target = window.document.getElementById(this.props.portal);
      window.addEventListener("resize", this._updateParentDimensions);
      this._updateParentDimensions();
		} else {
			this._target = window.document.createElement('div');
			window.document.body.appendChild(this._target);
		}
		this._renderLayer();
	}

  _updateParentDimensions(){
    const height = this._target.parentElement.offsetHeight;
    const width = this._target.parentElement.offsetWidth;
    this.setState({dimensions: {height, width}});
  }

	_renderLayer() {
    const content = this.renderLayer();
    const popupBackground = {
      zIndex: 1000,
      position: 'absolute',
      width: this.state.dimensions.width,
      height: this.state.dimensions.height,
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center'
    };
    const popup = {
      alignSelf: 'center',
      verticalAlign: 'middle',
      display: 'inline-block',
      backgroundColor: 'white'
    };
		ReactDOM.render(
      <div style={popupBackground}>
        <span style={popup}>
          {content}
        </span>
      </div>

      , this._target);
	}

	_unrenderLayer() {
		ReactDOM.unmountComponentAtNode(this._target);
	}

  render() {
    return <span/>;
  }
};
