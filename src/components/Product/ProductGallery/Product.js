import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { imageLoaded: false };
  }

  imgLoaded = () => {
    this.setState({ imageLoaded: true })
  }

  render() {
    let price = this.props.product.price
    let saleTab = undefined
    if (this.props.product.promoPrice) {
      price = this.props.product.promoPrice
      saleTab = <div className="p-pgal_product-saletab u-font-lato7 animated fadeIn">Sale</div>
    }
    return (
      <div className="p-pgal_product">
        <Link to={`/products${this.props.product.path}`}>
          {saleTab}
          <div className="p-pgal_product-image">
            <img className={`img ${this.state.imageLoaded ? 'loaded' : 'unloaded'}`} onLoad={this.imgLoaded} src={this.props.product.image.src} alt=""/>
          </div>
          <div className="p-pgal_product-wrapper">
            <h3>{this.props.product.title}</h3>
            <p>{this.props.formatPrice(price)}</p>
          </div>
        </Link>
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired
};

export default Product;