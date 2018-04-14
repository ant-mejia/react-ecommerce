import React, { Component } from 'react';
import View from '../../containers/View';
import CollectionItem from '../../components/Collection/CollectionItem';

class Collections extends Component {
  constructor(props) {
    super(props);
    this.preState = {};
    this.props.socket.on('collections/view', (response) => {
      this.setStateOnMount({ collections: response.data });
    });
    this.state = { collections: [] };
  }
  setStateOnMount = (obj) => {
    if (this.mounted !== true) {
      let keys = Object.keys(obj);
      keys.map((key) => {
        this.preState[key] = obj[key];
      })
    } else {
      this.setState(obj);
    }
  }
  componentDidMount() {
    console.log('mounted');
    this.mounted = true;
    this.props.actions.getCollections();
  }

  render() {
    return (
      <div className="c-page">
        <h2>Collections</h2>
        {this.state.collections.map((c) => <CollectionItem key={c.uid} collection={c}/>)}
      </div>
    );
  }

}

export default Collections;