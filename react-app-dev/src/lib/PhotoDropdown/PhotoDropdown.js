import React from 'react';
import './PhotoDropdown.css';

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showDropdown: false
    }
  }
  render(){
    let dividerCount = 0;
    return (
      <div className="dropdown pull-right">
        <button style={{margin: 10 + 'px', border: 'none', background: 'none'}} onClick={() => this.setState({showDropdown: !this.state.showDropdown})} type="button">
          <span style={{color: '#999', paddingRight: 5 + 'px'}} className="glyphicon glyphicon-triangle-bottom acc-drop-down"/>
          <img className="acc-drop-down" style={{borderRadius: 50 + '%'}} height="40px" width="40px"
            src={this.props.photoUrl}/>
        </button>
        <ul className={`acc-drop-down dropdown-menu ${this.state.showDropdown ? "show" : null}`}>
          {this.props.dropDown.map((item, index) => (
            item.label === 'divider' ?
            <li key={item.label + (++dividerCount).toString()} className='divider'/>
            :
            <li key={item.label} onClick={item.onClick}><a>{item.label}</a></li>
          ))}
        </ul>
      </div>
    );
  }

  componentDidMount(){
    this.setupDropdown();
  }

  componentDidUpdate(){
    this.setupDropdown();
  }

  setupDropdown(){
    window.onclick = event => {
      if (!event.target.matches('.acc-drop-down'))
        this.setState({
          showDropdown: false
        });
    }
  }

}
