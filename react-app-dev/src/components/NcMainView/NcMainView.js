import React from 'react';
import {PropsRoute} from '@lib/CustomRoutes';

export default (props) => (
  <div className="container">
    <div className="col-md-10 col-md-offset-1">
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
