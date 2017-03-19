import React, { Component } from 'react';
import './NcNavBar.css';
import logo from '@media/nclogosmall.png';

//react-bootstrap imports
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';


function handleSelect(selectedKey) {
  console.log('selected ' + selectedKey);
}

function NavTabs(props){
  return (
    <Nav bsStyle="pills" className="pull-left nc-nav-pills" activeKey={1} onSelect={handleSelect}>
      <NavItem eventKey={1} href="/home">Home</NavItem>
      <NavItem eventKey={2} href="/blogs">Blogs</NavItem>
    </Nav>
  );
}

class LoginNav extends Component {
  render(){
    return (
      <ButtonToolbar className="pull-right" style={{marginTop: 13 + 'px'}}>

        <a href="/login">
          <Button bsStyle="link" className="nc-nav-login-btn">
            <div className="nc-nav-login-txt">Login</div>
          </Button>
        </a>

        <a href="/register">
          <Button bsStyle="link" className="nc-nav-login-btn">
            <div className="nc-nav-login-txt">Register</div>
          </Button>
        </a>
      </ButtonToolbar>
    );
  }
}

function NavLogo(props){
  return (
    <a href="/">
      <img style={{margin: 10 + 'px'}} className="pull-left" alt="logo" src={logo}/>
      <h2 className="text-muted pull-left" style={{marginLeft: 5 + 'px', marginTop: 16 + 'px', marginBottom: 12 + 'px', color: '#66cc33'}}><b>Nodeocrat</b></h2>
    </a>
  );
}

class NcNavBar extends Component {
  render() {
    return (
      <div className="nc-nav-bar">
        <div className="container">
					<div className="col-lg-10 col-lg-offset-1">
			      <nav>
              <NavLogo/>
              <NavTabs/>
              <LoginNav/>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default NcNavBar;
