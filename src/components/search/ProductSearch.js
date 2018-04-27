import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductSearch extends Component {

  render() {
    return (
      <div>
        <Link to={`products${this.props.data.path}`}><h5>{this.props.data.title}</h5></Link>
      </div>
    );
  }
}

ProductSearch.propTypes = {
  data: PropTypes.object.isRequired
};

export default ProductSearch;
