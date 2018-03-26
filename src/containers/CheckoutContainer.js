import React, { Component } from 'react';
import _ from 'lodash';
import Checkout from '../views/auth/checkout/Checkout';
import ContinuePrompt from '../views/auth/checkout/ContinuePrompt';
import Shipping from '../views/auth/checkout/Shipping';
import Billing from '../views/auth/checkout/Billing';
import View from './View';

class Order {
  constructor() {}

  shippingValid() {
    let response = false;
    let shipping = this.shipping;
    if (this.shipping !== undefined || this.shipping !== null) {
      if (_.has(shipping, 'method') && _.has(shipping, 'shippingId')) {
        return true;
      }
    }
    return response;
  }

  billingValid() {
    return true;
  }

  hasId() {
    return false;
  }

  submitOrder() {}
}

class CheckoutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { order: new Order() };
    this.components = [{ name: 'shipping', component: Shipping }, { name: 'billing', component: Billing }, { name: 'Review', component: Checkout }]
  }

  componentDidMount() {}

  handleShipping = (obj) => {
    let order = this.state.order;
    order.shipping = obj
    this.setState({ order: order })
  }

  handleBilling = (obj) => {
    let order = this.state.order;
    order.billing = obj
    this.setState({ order: order })
  }

  checkoutStep = () => {
    if (this.state.order.shipping === undefined && this.state.order.billing === undefined) {
      return 1;
    } else if (this.state.order.shippingValid() && this.state.order.billing === undefined) {
      return 2;
    } else if (this.state.order.shippingValid() && this.state.order.billingValid()) {
      return 3;
    }
  }
  cacheOrder = () => {
    const order = this.state.order;
    if (order.shippingValid()) {
      this.props.actions.setCache('order', order);
    }
  }
  componentWillUnmount() {
    if (!this.state.order.hasId()) {
      console.log('unfinished business!');
      this.cacheOrder();
    }
  }

  propmtResponse = (bool) => {
    // if true set state order to cached order
    if (bool === true) {
      let order = this.props.actions.getCache('order');
      this.props.actions.setCache('order', undefined);
      this.setState({ order });
    } else {
      this.props.actions.setCache('order', undefined);
      this.setState({ order: new Order })
    }
  }

  handleRender = () => {
    if (this.props.actions.getCache('order') !== undefined) {
      return <ContinuePrompt respond={this.propmtResponse}/>
    }
    let shippingView = <Shipping handleShipping={this.handleShipping}/>;
    let billingView = <Billing handleBilling={this.handleBilling}/>;
    let reviewView = <Checkout actions={this.props.actions} store={this.props.store}/>
    if (this.state.order.shipping === undefined && this.state.order.billing === undefined) {
      return shippingView;
    } else if (this.state.order.shippingValid() && this.state.order.billing === undefined) {
      return billingView;
    } else if (this.state.order.shippingValid && this.state.order.billingValid()) {
      return reviewView;
    } else {
      return shippingView;
    }
  }

  render() {
    return (
      <View mini>
        <div>Step: {this.checkoutStep()}</div>
        {this.handleRender()}
      </View>
    )
  }

}

export default CheckoutContainer;