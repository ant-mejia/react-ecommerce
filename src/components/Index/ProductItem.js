import React, { Component } from 'react';
import Product from '../../components/Product/ProductGallery/Product';
class ProductItem extends Component {

  render() {
    return (
      <div className={`${this.props.className}`}>
        <Product formatPrice={this.props.formatPrice} product={this.props.product}/>
      </div>
    );
  }

}

export default ProductItem;