import React, { Component } from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false, index: 0 };
  }

  toggleActive = () => {
    this.setState({ active: !this.state.active })
  }

  handleClick = (index) => {
    this.setState({ index: index })
    if (this.props.onChange) {
      let value = this.props.values[index];
      this.props.onChange(value);
    }
    this.toggleActive();
  }

  render() {
    let values = this.props.values;
    if (_.isPlainObject(values)) {
      values = _.values(this.props.values)
    }
    console.log("VALUES :: ", values);
    console.log("VALUE PROPS :: ", this.props.values);
    return (
      <div className={`p-pgal_dropdown${this.state.active ? ' active' : ''}`}>
        <h2 className="p-pgal_dropdown-value u-font-lato7" onClick={this.toggleActive}>{`Sort By: ${values[this.state.index] || this.props.defaultValue}`}</h2>
        <div className="p-pgal_dropdown-list">
          {values.map((prop, index) => {
            return this.state.index === index ?  null :
            <div key={index} onClick={() =>this.handleClick(index)} className="p-pgal_dropdown-list_item"><h5 className="u-font-lato7">{prop}</h5></div>
          })}
        </div>
      </div>
    );
  }
}

Dropdown.defaultProps = {
  defaultValue: "Default",
  values: {}
}

Dropdown.propTypes = {
  values: PropTypes.object.isRequired
};

export default Dropdown;