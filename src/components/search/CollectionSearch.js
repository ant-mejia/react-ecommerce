import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CollectionSearch extends Component {

  render() {
    return (
      <div>
        <Link to={`collections${this.props.data.path}`}>
          <h5 className="p-search_list-item_title u-font-lato3">{this.props.data.title}</h5>
          <p className="p-search_list-item_summary">{this.props.data.tagline}</p>
        </Link>
      </div>
    );
  }
}
CollectionSearch.propTypes = {
  data: PropTypes.object.isRequired
};

export default CollectionSearch;