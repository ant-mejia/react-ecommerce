import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductSearch from './ProductSearch';
import CollectionSearch from './CollectionSearch';
class SearchGallery extends Component {

  render() {
    return (
      <div>
        <h2>Search Results</h2>
        {
          this.props.results.map((result) => {
            if (result.type === 'product') {
              return <ProductSearch key={result.data.uid} data={result.data}/>
            } else if (result.type === 'collection') {
              return <CollectionSearch key={result.data.uid} data={result.data}/>
            }
          })
        }
      </div>
    );
  }
}
SearchGallery.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchGallery;
