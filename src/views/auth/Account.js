import React, { Component } from 'react';

class Account extends Component {

  getUser = () => {
    return this.props.actions.getStore('user');
  }

  render() {
    console.log("Is User Auth: ", this.props.actions.isUserAuth('strict'));
    return (
      <div className="c-page">
        <h1>My Account</h1>
        <h2>This is my account</h2>
        <p>User ID: {this.getUser().uid}</p>
        <p>Email Address: {this.getUser().email}</p>
        <p>Password: {this.getUser().password}</p>
        <p>Privilege Level: {this.getUser().privilege}</p>
        <h4>Profile</h4>
        <p>First Name: {this.getUser().profile.firstName}</p>
        <p>Last Name: {this.getUser().profile.lastName}</p>
        <button onClick={this.props.actions.logoutUser}>Log Out</button>
      </div>
    );
  }

}

export default Account;