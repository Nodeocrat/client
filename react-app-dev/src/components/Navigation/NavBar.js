//3rd party
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import {logout} from '@actions/userActions';

//Components
import LoginRegisterNav from './LoginRegisterNav';

//Styles
import './NcNavBar.css';

//Media
import logo from '@media/nclogosmall.png';

const NavTabs = props => (
  <ul className="nav nav-pills pull-left nc-nav-pills">
    {props.routes.map(route => (
      route.navTab ?
        <NavLink exact={route.exact ? true : false} key={route.name} to={route.path}>
          <li>
            <div>{route.name}</div>
          </li>
        </NavLink> : null
    ))}
  </ul>
);

import PhotoDropdown from '@lib/PhotoDropdown/PhotoDropdown';
const UserMenu = withRouter(({history, onLogout, profile}) => {

  const dropDown = [
    {label: 'Account', onClick: () => history.push('/account')},
    {label: 'divider'},
    {label: 'Sign out', onClick: onLogout}
  ];

  return (
    <PhotoDropdown photoUrl={profile.photoUrl} dropDown={dropDown}/>
  );
});

const NavLogo = () => (
  <Link to="/">
    <img style={{margin: 10 + 'px'}} className="pull-left" alt="logo" src={logo}/>
    <h2 className="text-muted pull-left" style={{marginLeft: 5 + 'px', marginTop: 16 + 'px', marginBottom: 12 + 'px', color: '#66cc33'}}><b>Nodeocrat</b></h2>
  </Link>
);


//Container component
const NavBar = ({user, actions, routes}) => {

  let jsx = null;
  if(user.initialized){
    if(user.profile)
      jsx = <UserMenu profile={user.profile} onLogout={actions.logout}/>;
    else
      jsx = <LoginRegisterNav/>;
  } else {
    //TODO Better loading display
    jsx = <div className="pull-right" style={{color: 'white', marginTop: 20 + 'px'}}>Initializing...</div>
  }

  return (
    <div className="nc-nav-bar">
      <div className="container">
  			<div className="col-lg-10 col-lg-offset-1">
  	      <nav>
            <NavLogo/>
            <NavTabs routes={routes}/>
            {jsx}
          </nav>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, ownProps){
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({logout}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
