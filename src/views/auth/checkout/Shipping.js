import React, { Component } from 'react';
import View from '../../../containers/View';

class Shipping extends Component {
  componentDidMount() {
    let af = this.refs[this.props.order.activeRef]
    if (af !== undefined) {
      af.focus();
    }
  }

  handleInputFocus = (ref) => {
    this.props.order.setActiveRef(ref);
  }

  handleInputBlur = (ref) => {
    this.props.order.setActiveRef(undefined);
  }

  handleInputChange = (ref) => {
    this.props.order.setRefVal(ref, this.refs[ref].value)
  }
  handleSubmit = () => {
    this.props.handleShipping({ method: 'ground', shippingId: '102mas' });
  }

  render() {
    return (
      <div>
        <h1>Enter shipping address!</h1>
        <form>
          <input defaultValue={this.props.order.getRef('addressLine1')} ref='addressLine1' onChange={()=>this.handleInputChange('addressLine1')} onFocus={() => this.handleInputFocus('addressLine1')} onBlur={() => this.handleInputBlur('addressLine1')} type="text" placeholder="Address Line 1"/>
          <input defaultValue={this.props.order.getRef('addressLine2')} ref='addressLine2' onChange={()=>this.handleInputChange('addressLine2')} onFocus={() => this.handleInputFocus('addressLine2')} onBlur={() => this.handleInputBlur('addressLine2')} type="text" placeholder="Address Line 2"/>
        </form>
        <button onClick={this.handleSubmit}>Add Shipping</button>
      </div>
    );
  }

}

export default Shipping;