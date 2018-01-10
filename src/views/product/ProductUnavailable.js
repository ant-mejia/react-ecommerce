import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductUnavailable extends Component {

  render() {
    return (
      <div className="c-page">
        <h2>Product unavailable</h2>
      </div>
    );
  }
}

ProductUnavailable.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductUnavailable;