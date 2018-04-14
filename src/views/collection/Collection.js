import React, { Component } from 'react';
import View from '../../containers/View';
import NotFound from '../NotFound';
import CollectionProduct from '../../components/Collection/CollectionProduct';

class Collection extends Component {
  constructor(props) {
    super(props);
    this.preState = {};

    this.props.socket.on('collection/view', (response) => {
      if (response.type === 'success') {
        this.setStateOnMount({ collection: response.data });
      } else {
        console.log('boo');
      }
    });
    this.state = { collection: {} };
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
    this.mounted = true;
    this.props.actions.getCollectionByPath(`/${this.props.match.params.collection}`)
    // this.props.actions.getCollection();
  }

  render() {
    if (this.state.collection === null) {
      return <NotFound/>
    }
    if (this.state.collection.uid) {
      return (
        <View classNames="p-coll">
          <div className="p-coll_breadcrumb-wrapper">

          </div>
          <div className="p-coll_title-container">
            <div className="p-coll_title-wrapper">
              <h1 className="p-coll_title u-font-arista6 text-gradient-holo-5">{this.state.collection.title}</h1>
            </div>
            <div className="p-coll_tagline">
              <p>{this.state.collection.tagline}</p>
            </div>
          </div>
          <div><span className="li-down-open-big"></span></div>
          <div className="p-coll_detail-container">
            <div className="p-coll_detail-wrapper u-flex u-flex-around u-flex-col-reverse u-flex-col@sm">
              <div className="p-coll_detail-meta-wrapper">
                <div className="p-coll_detail-meta u-bgg-1">
                  <h3>30.01</h3>
                  <p>Test Metadata</p>
                </div>
                <div className="p-coll_detail-meta u-bgg-1">
                  <h3>30.01</h3>
                  <p>Test Metadata</p>
                </div>
                <div className="p-coll_detail-meta u-bgg-1">
                  <h3>30.01</h3>
                  <p>Test Metadata</p>
                </div>
                <div className="p-coll_detail-meta u-bgg-1">
                  <h3>30.01</h3>
                  <p>Test Metadata</p>
                </div>
              </div>
              <div className="p-coll_detail-description">
                <p>{this.state.collection.description}</p>
              </div>
            </div>
            <div className="p-coll_detail-wrapper">
              <h1>Summary</h1>
              <div>{this.state.collection.summary}</div>
            </div>
          </div>
          <div className="p-coll_gallery-container">
            <h1 className="u-text-center">{this.state.collection.title}</h1>
            <div className="p-coll_gallery">
              {this.state.collection.products.map((p) => <CollectionProduct className="p-coll_product" key={p.uid} formatPrice={this.props.actions.formatPrice} product={p}/>)}
            </div>
          </div>
        </View>
      );
    }
    return (
      <View/>
    )
  }
}

export default Collection;