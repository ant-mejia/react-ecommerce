import _ from 'lodash'
import React, { Component } from 'react';
import InputRange from 'react-input-range';
import Dropdown from './Dropdown';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], range: this.props.range };
  }

  rangeLabelFormat = (val) => {
    return `$${val}`
  }

  setRangeValue = (val) => {
    let range = this.state.range;
    range.value = val;
    this.setState({ range });
  }

  togglePromoRadio = () => {
    let initialFilter = this.props.options.filter;
    let b = false;
    if (initialFilter === undefined || initialFilter.onPromotion === undefined) {
      b = true;
    }
    this.props.updateFilterOptions('onPromotion', b || !this.props.options.filter.onPromotion)
  }

  render() {
    return (
      <div className="p-pgal_side">
        <Dropdown values={_.values(this.props.config.sort.values)} onChange={(d) => console.log(d,'abc!')}/>
        <div className="p-pgal_side-wrapper">
          <div>
            <h2>Filter</h2>
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
          <button onClick={this.togglePromoRadio} className="p-pgal_side-radio">On Sale</button>
          <div className="u-mv-small">
            <InputRange
              formatLabel={this.rangeLabelFormat}
              minValue={this.state.range.scope.min}
              maxValue={this.state.range.scope.max}
              step={this.state.range.scope.max / 10}
              value={this.state.range.value}
              onChange={(value) => this.setRangeValue(value)}
            />
          </div>
        </div>
      </div>
    );
  }
}


export default Sidebar;