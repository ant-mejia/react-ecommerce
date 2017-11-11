import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Login extends Component {

  render() {
    return (
      <div className="c-page">
        <div>
          <Link to="/"><p className="u-inline-block u-mr-small">Home</p></Link>
          <Link to="/about"><p className="u-inline-block u-mr-small">about</p></Link>
          <Link to="/asda"><p className="u-inline-block u-mr-small">asda</p></Link>
        </div>
        <h1>Log In</h1>
        <form onSubmit={e => this.props.actions.authSignin(e)}>
          <input type="text" placeholder="email"/>
          <input type="password" placeholder="password"/>
          <input type="submit"/>
        </form>
      </div>
    );
  }

}

export default Login;
