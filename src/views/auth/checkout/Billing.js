import React, { Component } from 'react';
import View from '../../../containers/View';

class Billing extends Component {
  handleSubmit = () => {
    this.props.handleBilling({ billingId: 'abc' });
  }
  render() {
    return (
      <div>
        Billing Container
        <button onClick={this.handleSubmit}>Add Shipping</button>
      </div>
    );
  }

}

export default Billing;