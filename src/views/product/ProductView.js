import React, { Component } from 'react';
import NotFound from '../NotFound';

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    console.log(this.props.match.params.product);
    if (this.state.product === null) {
      return <NotFound/>
    }
    return (
      <div className="c-page">
        <h1>Page!</h1>
        <h2>Product: {this.props.match.params.product}</h2>
      </div>
    );
  }

}

export default ProductView;