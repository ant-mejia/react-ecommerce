import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CollectionItem extends Component {

  render() {
    return (
      <Link to={`/collections${this.props.collection.path}`}>
        <div className="p-cols_list-item">
          <h2 className="p-cols_list-item_title u-font-lato6">{this.props.collection.title}</h2>
          <p className="p-cols_list-item_summary u-font-lato4">{this.props.collection.summary}</p>
          <span className="p-cols_list-item_tag u-font-lato4">View Collection</span>
        </div>
      </Link>
    );
  }

}

export default CollectionItem;