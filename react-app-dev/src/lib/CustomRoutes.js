import {Route} from 'react-router-dom';
import React from 'react';


// from http://stackoverflow.com/questions/27864720/react-router-pass-props-to-handler-component
function renderMergedProps(component, ...rest){
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

function PropsRoute({ component, ...rest }){
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

/* TODO once Redux/have a singleton user service
const PrivateRoute = ({ component, redirectTo, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return auth.loggedIn() ? (
        renderMergedProps(component, routeProps, rest)
      ) : (
        <Redirect to={{
          pathname: redirectTo,
          state: { from: routeProps.location }
        }}/>
      );
    }}/>
);
};*/

export {PropsRoute}
