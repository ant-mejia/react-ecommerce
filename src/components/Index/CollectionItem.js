import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CollectionItem extends Component {

  render() {
    return (
      <div className="p-index_collection">
        <Link to={`/collections${this.props.collection.path}`}>
          <div className="p-index_collection-background">
            <img src="http://d29u17ylf1ylz9.cloudfront.net/mimosa/img/banner/4.jpg" alt=""/>
          </div>
          <div className="p-index_collection-wrapper ">
            <h3 className="p-index_collection-title">{this.props.collection.title}</h3>
            <h4 className="p-index_collection-tagline">{this.props.collection.tagline}</h4>
          </div>
        </Link>
      </div>
    );
  }

}

export default CollectionItem;