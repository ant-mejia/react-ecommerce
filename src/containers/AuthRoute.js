import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Route, Redirect } from 'react-router-dom';


class AuthRoute extends React.Component {

  handleRender = () => {
    let p = this.props;
    let Component = this.props.component;
    return (p.actions.isUserAuth() ? (<Component {...p}/>) : p.actions.getStorage('jtk') ? <div/> : (
      <Redirect to={{pathname: '/login', state: { from: this.props.location } }}/>
    ))
  }
  render() {
    return (
      <Route children={this.handleRender}/>
    )
  }
};

AuthRoute.propTypes = {
  actions: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default AuthRoute;