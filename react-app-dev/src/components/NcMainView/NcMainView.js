import React from 'react';
import './NcMainView.css';
import { Route } from 'react-router-dom';
import {PropsRoute} from '@lib/CustomRoutes';

export default (props) => (
  <div className="container">
    <div className="col-lg-10 col-lg-offset-1">
      {props.routes.map((route) => {
        const paths = route.paths ? route.paths : [route.path];
        return paths.map((path) => (
          <PropsRoute key={route.path}
            exact={route.exact ? true : false}
            path={path}
            component={route.view}
            user={props.user}
            onUserUpdate={props.onUserUpdate}/>
        ))
      })}
    </div>
  </div>
);
