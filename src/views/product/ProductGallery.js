import React, { Component } from 'react';
import InputRange from 'react-input-range';
import View from '../../containers/View';
import Product from '../../components/Product/ProductGallery/Product';

class ProductGallery extends Component {
  constructor(props) {
    super(props);
    this.preState = {};
    this.state = { products: [], range: { value: { min: 0, max: 500 }, scope: { min: 0, max: 500 } } };
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

  rangeLabelFormat = (val) => {
    return `$${val}`
  }
  setRangeValue = (val) => {
    let range = this.state.range;
    range.value = val
    this.setState({ range })
  }

  componentDidMount() {
    this.mounted = true;
    this.props.actions.getProducts();
    if (this.preState !== undefined) {
      this.setState(this.preState);
    };
  }
  render() {
    return (
      <View classNames="p-pgal">
        <h2>Product Gallery!</h2>
        <div className="p-pgal_container">
          <div className="p-pgal_side">
            <div className="p-pgal_dropdown">
              <h3 className="u-mv">Sort By: Default</h3>
            </div>
            <div className="p-pgal_side-wrapper">
              <div>
                <h3>Categories</h3>
                <h4>Table</h4>
                <h4>Chair</h4>
                <h4>Desk</h4>
                <h4>Bed</h4>
              </div>
              <h3>Side Barasdaddwa</h3>
              <h3>Side Barasdaddwa</h3>
              <h3>Side Barasdaddwa</h3>
              <h3>Side Barasdaddwa</h3>
              <h3>Side Barasdaddwa</h3>
              <div className="u-mv-small">
                <InputRange
                  formatLabel={this.rangeLabelFormat}
                  minValue={this.state.range.scope.min}
                  maxValue={this.state.range.scope.max}
                  step={this.state.range.scope.max / 10}
                  value={this.state.range.value}
                  onChange={(value) => this.setRangeValue(value)}
                  onChangeComplete={(val) => console.log(val)}/>
              </div>
            </div>
          </div>
          <div className="p-pgal_wrapper">
            {this.state.products.map((p) => {
              return <Product formatPrice={this.props.actions.formatPrice} key={p.uid} product={p}/>
            })}
          </div>
        </div>
      </View>
    );
  }

}

export default ProductGallery;
