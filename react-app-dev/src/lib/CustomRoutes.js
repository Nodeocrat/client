import {Route, withRouter} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import StatusText from '@lib/StatusText';
import LoginDialog from '@components/LoginDialog/LoginDialog';

function mergeProps(Component, ...rest){
  const finalProps = Object.assign({}, ...rest);
  return <Component {...finalProps}/>;
}

const PropsRoute = ({ component, ...rest }) => (
  <Route {...rest} render={routeProps => mergeProps(component, routeProps, rest)}/>
);

const mapStateToProps = (state, ownProps) => ({user: state.user, ...ownProps});
const AuthRouteComponent = ({user, component, unauthComponent, history, ...rest}) => (
    <Route {...rest} render={routeProps => user.profile ?
      mergeProps(component, routeProps, rest) :
      (unauthComponent || <LoginDialog onClose={() => history ? history.goBack() : null } error="You must be logged in to view this page"/>)
    }/>
);

const AuthRoute = connect(mapStateToProps, {}, null, {pure:false})(withRouter(AuthRouteComponent));
export {PropsRoute, AuthRoute};
