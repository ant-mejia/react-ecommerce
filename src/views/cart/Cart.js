import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { cart: this.props.store.cart };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.store.cart !== nextProps.store.cart;
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
                <h5>{item.product.summary}</h5>
                {/* {keys.map((key) => {
                  return (
                    <h4>{`${key}: ${item[key]}`}</h4>
                  )
                })} */}
                <button onClick={() => this.props.actions.removeFromCart(item.uid)}>Remove Item</button>
              </div>
            )
          })}
          <Link to="/checkout"><button>Checkout</button></Link>
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