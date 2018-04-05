import React, { Component } from 'react';
import View from '../../../containers/View';

class ContinuePrompt extends Component {

  handleConfirm = () => {
    this.props.respond(true)
  }
  handleReject = () => {
    this.props.respond(false)
  }
  render() {
    return (
      <div> 
        <h1>Would you like to continue your previous order?</h1>
        <button onClick={this.handleConfirm}>Yes</button>
        <button onClick={this.handleReject}>No</button>
      </div>
    );
  }

}

export default ContinuePrompt;