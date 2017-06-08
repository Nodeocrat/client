import {Route} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import StatusText from '@lib/StatusText';

function mergeProps(Component, ...rest){
  const finalProps = Object.assign({}, ...rest);
  return <Component {...finalProps}/>;
}

const PropsRoute = ({ component, ...rest }) => (
  <Route {...rest} render={routeProps => mergeProps(component, routeProps, rest)}/>
);

const mapStateToProps = (state, ownProps) => ({user: state.user, ...ownProps});
const AuthRoute = connect(mapStateToProps, {}, null, {pure:false})(({user, component, ...rest}) => (
  <Route {...rest} render={routeProps => user.profile ?
    mergeProps(component, routeProps, rest) :
    <StatusText type="error" text="You must be logged in to view this page"/>
  }/>
));

export {PropsRoute, AuthRoute};
