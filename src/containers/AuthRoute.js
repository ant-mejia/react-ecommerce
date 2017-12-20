import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';


const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      let p = { ...rest };
      return (p.actions.isUserAuth() ? (<Component {...rest}/>): (true ? (
    <Redirect to={{pathname: '/login', state: { from: props.location } }}/>
  ) : (<Component {...rest}/>))
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