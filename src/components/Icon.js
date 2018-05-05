import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Icon extends Component {

  render() {
    if (this.props.name === undefined) {
      return null;
    }
    return (
      <span className={`${this.props.prefix}${this.props.name} icon-${this.props.size} ${this.props.className}`}/>
    );
  }

}

export default Icon;

Icon.defaultProps = {
  prefix: "li-",
  size: "small",
  className: ""
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  className: PropTypes.string
};