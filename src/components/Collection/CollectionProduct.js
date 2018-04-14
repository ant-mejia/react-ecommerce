import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CollectionProduct extends Component {
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
      saleTab = <div className="p-pgal_product-saletab u-font-lato7">Sale</div>
    }
    return (
      <div className={this.props.className}>

        {saleTab}
        <div className="p-pgal_product-image">
          <img className={`img ${this.state.imageLoaded ? 'loaded' : 'unloaded'}`} onLoad={this.imgLoaded} src="https://images.pexels.com/photos/436784/pexels-photo-436784.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""/>
        </div>
        <div className="p-pgal_product-wrapper">
          <Link to={`/products${this.props.product.path}`}><h3>{this.props.product.title}</h3></Link>
          <p>{this.props.formatPrice(price)}</p>
        </div>
      </div>
    );
  }
}

export default CollectionProduct;