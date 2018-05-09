import React, { Component } from 'react';
import _ from 'lodash'
import InputRange from 'react-input-range';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], range: this.props.range };
  }

  rangeLabelFormat = (val) => {
    return `$${val}`
  }

  setRangeValue = (val) => {
    this.props.setRangeValue(val);
  }

  setMinMaxPrice = (data) => {
    console.log(data);
    let range = data;
    let newRange = {}
    newRange.min = range.min * 100;
    newRange.max = range.max * 100;

    console.log(newRange);
    this.props.updateFilterOptions('price', newRange)
  }

  togglePromoRadio = () => {
    let initialFilter = this.props.options.filter;
    let b = false;
    if (initialFilter === undefined || initialFilter.onPromotion === undefined) {
      b = true;
    }
    this.props.updateFilterOptions('onPromotion', b || !this.props.options.filter.onPromotion)
  }

  handleDropdownChange = (sort) => {
    this.props.updateSortOptions(sort);
  }

  render() {
    return (
      <div className="p-pgal_side">
        <Dropdown initialIndex={this.props.options.sort} values={this.props.config.sort ? this.props.config.sort.values : this.props.config.sort} onChange={this.handleDropdownChange}/>
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
          <button onClick={this.togglePromoRadio} className={`p-pgal_side-button u-font-lato6 ${this.props.options.filter ? this.props.options.filter.onPromotion ? 'active' : '' : ''}`}>On Sale</button>
          <div className="u-mv-small">
            <InputRange
              formatLabel={this.rangeLabelFormat}
              minValue={this.state.range.scope.min}
              maxValue={this.state.range.scope.max}
              step={this.state.range.scope.max / 10}
              value={this.props.range.value}
              onChange={(value) => this.setRangeValue(value)}
              onChangeComplete={(a) => this.setMinMaxPrice(a)}
            />
          </div>
        </div>
      </div>
    );
  }
}
Sidebar.defaultProps = {
  config: {}
}
Sidebar.propTypes = {
  config: PropTypes.object.isRequired
};


export default Sidebar;