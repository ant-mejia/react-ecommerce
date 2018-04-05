import React, { Component } from 'react';
import View from '../../../containers/View';

class Checkout extends Component {

  handleCheckout = () => {
    this.props.actions.userCheckout();
  }
  render() {
    return (
      <View wrap title='Checkout!'>
        <h1>Checkout!</h1>
        <h2>Choose Shipping Address</h2>
        {
          this.props.actions.getStore('user.address').map((item) => {
            return (
              <div key={item.uid}>
                <p>{`${item.buildingNumber} ${item.streetName}`}</p>
                <p>{`${item.city}, ${item.state} ${item.zipCode}`}</p>
              </div>
            )
          })
        }
        <button onClick={this.handleCheckout}>Checkout!</button>
      </View>
    );
  }
}

export default Checkout;