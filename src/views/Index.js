import React, { Component } from 'react';

class Index extends Component {

  render() {
    const { className, ...props } = this.props;
    return (
      <div className="c-page">
        <h1>Welcome to React!! This is the index page!</h1>
      </div>
    );
  }
}

export default Index;
