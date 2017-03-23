import React, {Component} from 'react';
import './NcNavBar.css';
import logo from '@media/nclogosmall.png';
import { Link, NavLink, Route } from 'react-router-dom';

//custom components
import RegisterDialog from '@components/RegisterDialog/RegisterDialog';

const NavTabs = (props) => (
  <ul className="nav nav-pills pull-left nc-nav-pills">
    {props.routes.map((route) => (
      <NavLink
        exact={route.path === "/" ? true : false}
        key={route.name} to={route.path}>
        <li>
          <div>{route.name}</div>
        </li>
      </NavLink>
    ))}
  </ul>
);



const LoginNav = () => (
  <Route path="*" render={({match}) => (
    <div>
      <ul className="nav nav-pills nav-login-btns pull-right nc-nav-pills">
        <Link to={`${match.url==="/"?"":match.url}/login`}>
          <li>
            <div>Login</div>
          </li>
        </Link>
        <Link to={`${match.url==="/"?"":match.url}/register`}>
          <li>
            <div>Register</div>
          </li>
        </Link>
      </ul>

      <Route path={'*/register'} component={RegisterDialog}/>
      <Route path={'*/login'} component={RegisterDialog}/>
    </div>
  )}/>
);

const NavLogo = () => (
  <Link to="/">
    <img style={{margin: 10 + 'px'}} className="pull-left" alt="logo" src={logo}/>
    <h2 className="text-muted pull-left" style={{marginLeft: 5 + 'px', marginTop: 16 + 'px', marginBottom: 12 + 'px', color: '#66cc33'}}><b>Nodeocrat</b></h2>
  </Link>
);

export default ({routes}) => (
  <div className="nc-nav-bar">
    <div className="container">
			<div className="col-lg-10 col-lg-offset-1">
	      <nav>
          <NavLogo/>
          <NavTabs routes={routes}/>
          <LoginNav location={location}/>
        </nav>
      </div>
    </div>
  </div>
);
