import React from 'react';
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
  actions: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
};

export default AuthRoute;
