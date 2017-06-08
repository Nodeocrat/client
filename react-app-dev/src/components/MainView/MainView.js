import React from 'react';
import {PropsRoute, AuthRoute} from '@lib/CustomRoutes';

export default (props) => (
  <div className="container">
    <div className="col-md-10 col-md-offset-1">
      {props.routes.map(route => {
        const otherProps = route.props || {};
        const routeProps = {
          key: route.path,
          exact: route.exact ? true : false,
          path: route.path,
          component: route.view,
          ...otherProps
        };
        if(route.authRequired)
          return <AuthRoute {...routeProps}/>;
        else
          return <PropsRoute {...routeProps}/>;
      })}
    </div>
  </div>
);
