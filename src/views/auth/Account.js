import React, { Component } from 'react';
import View from '../../containers/View';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.actions.getStore('user')
    };
  }

  render() {
    return (
      <View>
        <h1>My Account</h1>
        <h2>This is my account</h2>
        <p>User ID: {this.state.user.uid}</p>
        <p>Customer ID: {this.state.user.customerId}</p>
        <p>Email Address: {this.state.user.email}</p>
        <p>Password: {this.state.user.password}</p>
        <p>Privilege Level: {this.state.user.privilege}</p>
        <h4>Profile</h4>
        <p>First Name: {this.state.user.profile.firstName}</p>
        <p>Last Name: {this.state.user.profile.lastName}</p>
        <button onClick={this.props.actions.logoutUser}>Log Out</button>
      </View>
    );
  }

}

export default Account;