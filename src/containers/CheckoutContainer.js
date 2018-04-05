import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';
import Checkout from '../views/auth/checkout/Checkout';
import SideNav from '../components/SideNav';
import ContinuePrompt from '../views/auth/checkout/ContinuePrompt';
import Shipping from '../views/auth/checkout/Shipping';
import Billing from '../views/auth/checkout/Billing';
import View from './View';

class Order {
  constructor() {
    this.refs = {};
  }

  inProgress() {
    if (!_.isEmpty(this.refs) || this.shippingValid()) {
      return true;
    } else {
      return false;
    }
  }

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

  setActiveRef(ref) {
    this.activeRef = ref
  }

  getRef(ref) {
    return this.refs[ref];
  }

  setRefVal(ref, val) {
    this.refs[ref] = val
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
      return 'Shipping';
    } else if (this.state.order.shippingValid() && this.state.order.billing === undefined) {
      return 'Billing';
    } else if (this.state.order.shippingValid() && this.state.order.billingValid()) {
      return 'Review';
    }
  }
  cacheOrder = () => {
    const order = this.state.order;
    if (order.inProgress()) {
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
    let shippingView = <Shipping order={this.state.order} handleShipping={this.handleShipping}/>;
    let billingView = <Billing order={this.state.order} handleBilling={this.handleBilling}/>;
    let reviewView = <Checkout order={this.state.order} actions={this.props.actions} store={this.props.store}/>
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
    let step = (<SideNav text={this.checkoutStep()}/>);
    if (this.props.actions.getCache('order') !== undefined) {
      step = undefined
    }
    return (
      <View mini>
        {/* {step} */}
        <View>
          <div className="u-flex@sm">
            <div className="u-1/2@sm">
              {this.handleRender()}
            </div>
            <div className="u-1/2@sm">
              <h1>My Cart</h1>
            </div>
          </div>
        </View>
      </View>
    )
  }

}

export default CheckoutContainer;