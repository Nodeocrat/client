import React from 'react';
import './NcMainView.css';
import { Route } from 'react-router-dom';

export default (props) => (
  <div className="container">
    <div className="col-lg-10 col-lg-offset-1">
      {props.routes.map((route) => (
        <Route key={route.path}
          exact={route.path === "/" ? true : false}
          path={route.path} component={route.view}/>
      ))}
    </div>
  </div>
);
