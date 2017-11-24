import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class Register extends Component {

  registerUser = (e) => {
    e.preventDefault();
    let user = {
      email: this.refs.email.value,
      password: 'adadadadsa'
    };
    this.props.actions.registerUser(user);
    console.log('re');
  }

  render() {
    let path = this.props.location.state ?
      this.props.location.state.from.pathname.split('/')[1] :
      '/profile';
    let heading = path === 'profile' ?
      'You have to Login!' :
      'Please Login';
    if (this.props.actions.isUserAuth()) {
      return (<Redirect to={'/profile'}/>)
    }
    return (
      <div className="c-page">
        <h2>Register User</h2>
        <form onSubmit={e => this.registerUser(e)}>
          <input ref="email" type="text"/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default Register;
