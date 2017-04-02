import React, {Component} from 'react';
import './NcNavBar.css';
import logo from '@media/nclogosmall.png';
import { Link, NavLink, Route, withRouter } from 'react-router-dom';
import LoginRegisterNav from './LoginRegisterNav';


const NavTabs = (props) => (
  <ul className="nav nav-pills pull-left nc-nav-pills">
    {props.routes.map((route) => (
      route.navTab ? (
        <NavLink
          exact={route.exact ? true : false}
          key={route.name} to={route.path}>
          <li>
            <div>{route.name}</div>
          </li>
        </NavLink>
      ) : (
        null
      )
    ))}
  </ul>
);

import PhotoDropdown from '@lib/PhotoDropdown/PhotoDropdown';
const UserMenu = withRouter((props) => {
  const dropDown = [
    {label: 'Account', onClick: () => props.history.push('/account')},
    {label: 'divider'},
    {label: 'Sign out', onClick: props.onSignOut}
  ];
  return (
    <PhotoDropdown photoUrl={props.profile.photoUrl} dropDown={dropDown}/>
  );
});

const NavLogo = () => (
  <Link to="/">
    <img style={{margin: 10 + 'px'}} className="pull-left" alt="logo" src={logo}/>
    <h2 className="text-muted pull-left" style={{marginLeft: 5 + 'px', marginTop: 16 + 'px', marginBottom: 12 + 'px', color: '#66cc33'}}><b>Nodeocrat</b></h2>
  </Link>
);

export default (props) => {

  let jsx = null;
  if(props.user.initialized){
    if(props.user.signedIn)
      jsx = (<UserMenu profile={props.user.profile}
        onSignOut={props.onSignOut}/>);
    else
      jsx = (<LoginRegisterNav onUserUpdate={props.user.updateUser}/>);
  }

  return (
    <div className="nc-nav-bar">
      <div className="container">
  			<div className="col-lg-10 col-lg-offset-1">
  	      <nav>
            <NavLogo/>
            <NavTabs routes={props.routes}/>
            {jsx}
          </nav>
        </div>
      </div>
    </div>
  );
}
