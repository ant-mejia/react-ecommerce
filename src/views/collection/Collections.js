import React, { Component } from 'react';
import View from '../../containers/View';
import CollectionItem from '../../components/Collection/CollectionItem';
import InViewMonitor from 'react-inview-monitor';

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
    console.log(window.ScrollReveal);
    console.log('mounted');
    this.mounted = true;
    this.props.actions.getCollections();
  }

  render() {
    return (
      <View classNames="p-cols">
        <h1 className="p-cols_title u-font-lato4">Collections</h1>
        <div className="p-cols_list u-pb-large">
          {this.state.collections.map((c) => {
            return (
              <InViewMonitor key={c.uid} classNameNotInView='vis-hidden' classNameInView='animated fadeInLeftBig'>
                <CollectionItem collection={c}/>
              </InViewMonitor>
            )
          })}
        </div>
      </View>
    );
  }

}

export default Collections;