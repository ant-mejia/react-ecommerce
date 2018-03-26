import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
class Login extends Component {

  componentDidMount() {
    let a = 10;
    let b = 13;
    let c = a + b;
  }

  logIn = (event) => {
    event.preventDefault();
    this.props.actions.loginUser(this.refs.emailInput.value, this.refs.passwordInput.value);
  }

  render() {
    let path = this.props.location.state ?
      this.props.location.state.from.pathname.split('/')[1] :
      '/account';
    let heading = path === 'account' ?
      'You have to Login!' :
      'Please Login';
    if (this.props.actions.isUserAuth()) {
      let pathTo = this.props.location.state ? this.props.location.state.from.pathname : '/account';
      return (<Redirect to={pathTo}/>)
    }
    return (
      <div className="c-page">
        <div>
          <Link to="/"><p className="u-inline-block u-mr-small">Home</p></Link>
          <Link to="/about"><p className="u-inline-block u-mr-small">about</p></Link>
          <Link to="/asda"><p className="u-inline-block u-mr-small">asda</p></Link>
        </div>
        <h1>Log In</h1>
        <form onSubmit={e => this.logIn(e)}>
          <input type="text" ref="emailInput" placeholder="email"/>
          <input type="password" ref="passwordInput" placeholder="password"/>
          <input type="submit"/>
        </form>
      </div>
    );
  }

}

export default Login;