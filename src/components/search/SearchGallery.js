import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductSearch from './ProductSearch';
import CollectionSearch from './CollectionSearch';
import InViewMonitor from 'react-inview-monitor';

class SearchGallery extends Component {

  render() {
    return (
      <div className="p-search_container">
        {this.props.inputEmpty() ? undefined: <h2>Search Results</h2>}
        <ul className="p-search_list">
          {
            this.props.results.map((result) => {
              let item = null;
              if (result.type === 'product') {
                item = <ProductSearch data={result.data}/>
              } else if (result.type === 'collection') {
                item = <CollectionSearch data={result.data}/>
              }
              return (
                <li className="p-search_list-item" key={result.data.uid}>
                  {item}
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}
SearchGallery.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchGallery;