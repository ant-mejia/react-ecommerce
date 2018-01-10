import React, { Component } from 'react';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { cart: this.props.store.cart };
  }

  render() {
    if (this.state.cart) {
      return (
        <div className="c-page">
          <h1>My Cart!</h1>
          {this.state.cart.map((item) => {
            let keys = Object.keys(item);
            return (
              <div key={item.uid} className="c-container">
                <h1>{item.product.title}</h1>
                <h5>{item.product.description}</h5>
                {keys.map((key) => {
                  return (
                    <h4>{`${key}: ${item[key]}`}</h4>
                  )
                })}
              </div>
            )
          })}
        </div>
      );
    } else {
      return (
        <div className="c-page">
          <h1>My Cart!</h1>
        </div>
      )
    }
  }

}

export default Cart;