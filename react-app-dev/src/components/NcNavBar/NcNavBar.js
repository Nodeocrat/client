import React, { Component } from 'react';
import './NcNavBar.css';
//import logo from '@media/nclogosmall.png';

//react-bootstrap imports
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';

function handleSelect(selectedKey) {
  alert('selected ' + selectedKey);
}

function NavTabs(props){
  return (
  <Nav bsStyle="pills" activeKey={1} onSelect={handleSelect}>
    <NavItem eventKey={1} href="/home">Home</NavItem>
    <NavItem eventKey={2} href="/blogs">Blogs</NavItem>
  </Nav>);
}

function NavLogo(props){
  return (
    <a href="/">
      <img style={{margin: 10 + 'px'}} className="nav-item pull-left" src="/static/media/nclogosmall.png"></img>
      <h2 className="text-muted pull-left" style={{marginLeft: 5 + 'px', marginTop: 16 + 'px', marginBottom: 12 + 'px', color: '#66cc33'}}><b>Nodeocrat</b></h2>
    </a>
  );
}

class NcNavBar extends Component {
  render() {
    return (
      <Navbar>
        <NavLogo/>
        <NavTabs/>
      </Navbar>
    );
  }
}

export default NcNavBar;
