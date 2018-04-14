import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import ProductPresentation1 from '../views/product/presentation/ProductPresentaton1';

class ProductViewContainer extends Component {

  render() {
    return (
      <div className="c-page_min">
        <Helmet>
          <title>{this.props.product.title}</title>
        </Helmet>
        <ProductPresentation1 formatPrice={this.props.actions.formatPrice} addToCart={this.props.addToCart} product={this.props.product}/>
      </div>
    );
  }
}

ProductViewContainer.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductViewContainer;