import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CollectionItem extends Component {

  render() {
    return (
      <Link to={`/collections${this.props.collection.path}`}>
        <div className="p-cols_list-item">
          <h2 className="p-cols_list-item_title">{this.props.collection.title}</h2>
          <p>View Collection</p>
        </div>
      </Link>
    );
  }

}

export default CollectionItem;