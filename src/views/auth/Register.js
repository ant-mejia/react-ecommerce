import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class Register extends Component {

  registerUser = (e) => {
    e.preventDefault();
    let user = {
      email: this.refs.email.value,
      password: this.refs.password.value,
      firstName: this.refs.firstname.value,
      lastName: this.refs.lastname.value
    };
    this.props.actions.registerUser(user);
  }

  render() {
    let path = this.props.location.state ?
      this.props.location.state.from.pathname.split('/')[1] :
      '/account';
    let heading = path === 'account' ?
      'You have to Login!' :
      'Please Login';
    if (this.props.actions.isUserAuth()) {
      return (<Redirect to={'/account'}/>)
    }
    return (
      <div className="c-page">
        <h2>Register User</h2>
        <form onSubmit={e => this.registerUser(e)}>
          <input ref="email" placeholder="email" type="text"/>
          <input ref="password" placeholder="password" type="password"/>
          <input ref="firstname" placeholder="firstname" type="text"/>
          <input ref="lastname" placeholder="lastname" type="text"/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default Register;