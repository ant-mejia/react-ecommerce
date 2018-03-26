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
      <View>
        <h1>Would you like to continue your previous order?</h1>
        <button onClick={this.handleConfirm}>Yes</button>
        <button onClick={this.handleReject}>No</button>
      </View>
    );
  }

}

export default ContinuePrompt;