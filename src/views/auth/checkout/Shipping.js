import React, { Component } from 'react';
import View from '../../../containers/View';

class Shipping extends Component {
  handleSubmit = () => {
    this.props.handleShipping({ method: 'ground', shippingId: '102mas' });
  }

  render() {
    return (
      <View>
        <h1>Enter shipping address!</h1>
        <form>
          <input type="text" placeholder="Address Line 1"/>
          <input type="text" placeholder="Address Line 2"/>
        </form>
        <button onClick={this.handleSubmit}>Add Shipping</button>
      </View>
    );
  }

}

export default Shipping;