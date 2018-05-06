import _ from 'lodash';
import React, { Component } from 'react';
import View from '../../containers/View';
import Icon from '../../components/Icon';
import Product from '../../components/Product/ProductGallery/Product';
import InViewMonitor from 'react-inview-monitor';
import Sidebar from '../../components/Product/ProductGallery/Sidebar';

class ProductGallery extends Component {
  constructor(props) {
    super(props);
    this.preState = {};
    this.state = { products: [], options: this.props.actions.getCache('productGalleryOptions') || {}, config: this.props.store.config.productGallery, range: { value: { min: 0, max: 500 }, scope: { min: 0, max: 500 } } };
    this.props.socket.on('products/view', (response) => {
      if (response.type === 'success') {
        this.setStateOnMount({ products: response.data });
      } else {
        this.setStateOnMount({ products: [] })
        console.log('failure!', response);
      }
    });
  }

  setStateOnMount = (obj) => {
    if (this.mounted !== true) {
      let keys = Object.keys(obj);
      keys.map((key) => {
        this.preState[key] = obj[key];
      })
    } else {
      this.setState(obj);
    }
  }

  calcMaxScope = () => {
    let maxScope = this.state.range.scope.max;
    if (this.state.products.length > 0) {
      // get the highest price of the products
      let highestPrice = 0;
      this.state.products.map((p) => {
        let price = p.promoPrice || p.price;
        if (price > highestPrice) {
          highestPrice = price;
        }
      });

      // round that number up to the nearest whole number
      let numCeil = Math.ceil(highestPrice / 100);
      // add the remainder of 50 to that number
      let remainder = 50 - (numCeil % 50);

      // return that number
      return numCeil + remainder;
    } else {
      return maxScope;
    }
  };

  updateFilterOptions = (key = '', val) => {
    let st = this.state.options;
    if (st.filter === undefined) {
      st.filter = {};
    }
    st.filter[key] = val;
    this.setState({ options: st });
    this.props.actions.getProducts(this.state.options);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.products !== prevState.products) {
      console.log('product updated');
      let newRange = this.state.range;
      newRange.scope.max = this.calcMaxScope();
      newRange.value.max = this.calcMaxScope();
      console.log(newRange);
      this.setState({ range: newRange })
    }
  }

  componentDidMount() {
    this.mounted = true;
    let options = { sort: "newest", filter: { onPromotion: false } }
    this.props.actions.getProducts(options);
    if (this.preState !== undefined) {
      this.setState(this.preState);
    };
  }

  componentWillUnmount() {
    if (!_.isEmpty(this.state.options)) {
      this.props.actions.setCache('productGalleryOptions', this.state.options)
    }
  }

  render() {
    console.log(this.props.actions.getCache('productGalleryOptions'));
    return (
      <View classNames="p-pgal">
        <h2>Product Gallery!</h2>
        <div className="p-pgal_container">
          <Sidebar range={this.state.range} updateFilterOptions={this.updateFilterOptions} options={this.state.options} config={this.state.config} className=""/>
          <div className="p-pgal_wrapper">
            {this.state.products.map((p) => {
              return (
                <InViewMonitor key={p.uid} classNameNotInView="p-pgal_product-container vis-hidden" classNameInView="p-pgal_product-container animated fadeInUp">
                  <Product formatPrice={this.props.actions.formatPrice} product={p}/>
                </InViewMonitor>
              )
            })}
          </div>
        </div>
      </View>
    );
  }

}

export default ProductGallery;