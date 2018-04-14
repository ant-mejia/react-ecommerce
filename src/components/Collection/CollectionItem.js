import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CollectionItem extends Component {

  render() {
    return (
      <div>
        <h2>{this.props.collection.title}</h2>
        <Link to={`/collections${this.props.collection.path}`}>View Collection</Link>
      </div>
    );
  }

}

export default CollectionItem;