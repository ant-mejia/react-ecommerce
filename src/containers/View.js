import React, { Component } from 'react';

class View extends Component {

  render() {
    return (
      <div className="c-page">
        {this.props.children}
      </div>
    );
  }

}

export default View;