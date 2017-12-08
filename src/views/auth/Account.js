import React, { Component } from 'react';

class Account extends Component {

  render() {
    console.log(this.props);
    return (
      <div className="c-page">
        <h1>My Account</h1>
        <h2>This is my account</h2>
      </div>
    );
  }

}

export default Account;