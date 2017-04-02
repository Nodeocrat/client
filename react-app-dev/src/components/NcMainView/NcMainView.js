import React from 'react';
import './NcMainView.css';
import { Route } from 'react-router-dom';
import {PropsRoute} from '@lib/CustomRoutes';

export default (props) => (
  <div className="container">
    <div className="col-lg-10 col-lg-offset-1">
      {props.routes.map((route) => {
        const routeProps = route.props || {};
        return (<PropsRoute key={route.path}
          exact={route.exact ? true : false}
          path={route.path}
          component={route.view}
          {...routeProps}/>);
      })}
    </div>
  </div>
);
