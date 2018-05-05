import React, { Component } from 'react';
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
    return (
      <div className={`p-pgal_dropdown${this.state.active ? ' active' : ''}`}>
        <h2 className="p-pgal_dropdown-value u-font-lato7" onClick={this.toggleActive}>{`Sort By: ${this.props.values[this.state.index]}`}</h2>
        <div className="p-pgal_dropdown-list">
          {this.props.values.map((prop, index) => {
            return this.state.index === index ?  null :
            <div key={index} onClick={() =>this.handleClick(index)} className="p-pgal_dropdown-list_item"><h5 className="u-font-lato7">{prop}</h5></div>
          })}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  values: PropTypes.array.isRequired
};

export default Dropdown;