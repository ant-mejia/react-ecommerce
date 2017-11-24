import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';


const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      let p = { ...rest };
      return (p.actions.isUserAuth() ? (<Component {...props}/>): (true ? (
    <Redirect to={{pathname: '/login', state: { from: props.location } }}/>
  ) : (<Component {...props}/>))
)
}
}
/>)
};

AuthRoute.propTypes = {
  actions: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default AuthRoute;
