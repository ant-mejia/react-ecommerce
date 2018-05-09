import React, { Component } from 'react';
import View from '../containers/View'
import { Link } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import CollectionItem from '../components/Index/CollectionItem';
import ProductItem from '../components/Index/ProductItem';

class Index extends Component {
  constructor(props) {
    super(props);
    // this.state = { config: this.props.store.config };
  }

  jumbotronContent = [{
    background: { src: 'https://www.screenaustralia.gov.au/sacms/media/samedialibrary/screenguide/titles/tid33797-mountain/tid33797-web/tid33797-mountain-001-hero.jpg', alt: 'Blah Blah Blah' },
    subheading: 'Heading One',
    heading: 'Alan Watts',
    title: 'I owe my solitude to other people.',
    summary: 'Some believe all that parents, tutors, and kindred believe. They take their principles by inheritance, and defend them as they would their estates, because they are born heirs to them.',
    link: { text: 'Shop Product', href: '/products/test-product' }
  }, {
    background: { src: 'https://revolutioncdn-themepunchgbr.netdna-ssl.com/wp-content/uploads/revslider/overexposure/exp_bg2.jpg', alt: 'Blah Blah Blah' },
    subheading: 'Heading Two',
    heading: 'Anthony Mejia',
    title: 'I owe my solitude to my Past.',
    summary: 'Some believe all that parents, tutors, and kindred believe. They take their principles by inheritance, and defend them as they would their estates, because they are born heirs to them.',
    link: { text: 'Shop Beta', href: '/products/test-product' }
  }, {
    background: { src: 'https://revolutioncdn-themepunchgbr.netdna-ssl.com/wp-content/uploads/revslider/overexposure/exp_bg5.jpg', alt: 'Blah Blah Blah' },
    subheading: 'Heading Three',
    heading: 'Alan Miller',
    title: 'I owe my solitude to other people.',
    summary: 'Some believe all that parents, tutors, and kindred believe. They take their principles by inheritance, and defend them as they would their estates, because they are born heirs to them.',
    link: { text: 'Shop Product', href: '/products/test-product' }
  }, {
    background: { src: 'https://revolutioncdn-themepunchgbr.netdna-ssl.com/wp-content/uploads/revslider/overexposure/exp_bg5.jpg', alt: 'Blah Blah Blah' },
    subheading: 'Heading Four',
    heading: 'Miller Mejia',
    title: 'I owe my solitude to my future.',
    summary: 'Some believe all that parents, tutors, and kindred believe. They take their principles by inheritance, and defend them as they would their estates, because they are born heirs to them.',
    link: { text: 'Shop Beta', href: '/products/test-product' }
  }]

  productData = [{ "uid": "rWUM24hZL1h7qHz0J8ETSmZwSkP2fk", "path": "/test-product", "title": "Test Product", "summary": "This is just a description for a fake product that does not even exist. This is just a description for a fake product that does not even exist.", "description": "<h2>This is an awesome ecommerce product!</h2>", "category": ["test"], "price": 10000, "availability": true, "clearance": 0, "releaseDate": "2018-01-24T23:54:39.061Z", "inventory": 100, "presentationLevel": 1, "images": null, "createdAt": "2017-12-26T01:12:23.389Z", "updatedAt": "2017-12-26T01:12:23.389Z", "promos": [{ "uid": "Akfkkmbfaofuowj92nw2j", "title": "30 Percent Off", "summary": "30% off everything!", "description": "Blah Blah Blah", "promotion": { "percent": 20, "amount": 1000 }, "active": true, "clearance": 0, "startDate": "2018-04-09T17:58:59.324Z", "endDate": "2018-05-09T17:58:59.324Z", "createdAt": "2018-04-09T17:58:59.324Z", "updatedAt": "2018-04-09T17:58:59.324Z", "productPromo": { "createdAt": "2018-04-09T19:13:26.741Z", "updatedAt": "2018-04-09T19:13:26.741Z", "promoUid": "Akfkkmbfaofuowj92nw2j", "productUid": "rWUM24hZL1h7qHz0J8ETSmZwSkP2fk" } }], "image": { "src": "https://revolutioncdn-themepunchgbr.netdna-ssl.com/wp-content/uploads/revslider/beforeafteraddon/object_coffee_1.png" }, "promoPrice": 7200 }, { "uid": "rWUM24hZL1eh7qHz0J8ETSmZwSkP2fk", "path": "/test-producte", "title": "Test - Inactive Promotion!", "summary": "This is just a description for a fake product that does not even exist. This is just a description for a fake product that does not even exist.", "description": "<h2>This is an awesome ecommerce product!</h2>", "category": ["test"], "price": 4000, "availability": true, "clearance": 0, "releaseDate": "2018-01-24T23:54:39.061Z", "inventory": 100, "presentationLevel": 1, "images": null, "createdAt": "2017-12-26T01:12:23.389Z", "updatedAt": "2017-12-26T01:12:23.389Z", "promos": [{ "uid": "aiOngka9afu8Kfan", "title": "$5 off", "summary": "$5 Off for Premium Users!", "description": "Blah Blah Blah", "promotion": { "amount": 502 }, "active": true, "clearance": 0, "startDate": "2018-04-09T21:18:52.716Z", "endDate": "2018-06-19T21:18:52.716Z", "createdAt": "2018-04-09T21:18:52.716Z", "updatedAt": "2018-04-09T21:18:52.716Z", "productPromo": { "createdAt": "2018-04-09T21:24:51.101Z", "updatedAt": "2018-04-09T21:24:51.101Z", "promoUid": "aiOngka9afu8Kfan", "productUid": "rWUM24hZL1eh7qHz0J8ETSmZwSkP2fk" } }], "image": { "src": "https://revolutioncdn-themepunchgbr.netdna-ssl.com/wp-content/uploads/revslider/beforeafteraddon/object_coffee_1.png" }, "promoPrice": 3498 }]

  render() {
    return (
      <div>
        <div className="c-page_jumbotron">
          <Jumbotron type="creative" content={this.jumbotronContent}/>
        </div>
        <View classNames="p-index">
          <div className="p-index_section">
            <h1 className="p-index_section-heading u-font-lato4">Featured Collections</h1>
            <h3 className="p-index_section-subheading u-font-lato4">This is just a lil sub heading</h3>
            <div>
              <div className="p-index_collections">
                { this.props.store.config.index ?
                  this.props.store.config.index.featuredCollections.map((c) => {
                    return (
                      <CollectionItem key={c.uid} collection={c}/>
                    )
                  }) : <p>loading</p>
                }
              </div>
            </div>
            <Link to="/collections">
              <h2>View All Collections</h2>
            </Link>
          </div>
          <div className="p-index_section">
            <h1 className="p-index_section-heading u-font-lato4">Featured Products</h1>
            <h3 className="p-index_section-subheading u-font-lato4">This is just a lil sub heading</h3>
            <div className="p-index_products-list">
              {this.productData.map((p) => {
                return <ProductItem key={p.uid} formatPrice={this.props.actions.formatPrice} className="p-index_products-list-item" product={p}/>
              })}
            </div>
            <Link to="/products">
              <h2>View All Products</h2>
            </Link>
          </div>
        </View>
      </div>
    );
  }
}

export default Index;
//
// <div className="p-index_collection p-index_collection-featured">
//   <div className="p-index_collection-background">
//     <img src="http://d29u17ylf1ylz9.cloudfront.net/mimosa/img/banner/4.jpg" alt=""/>
//   </div>
//   <Link to="/collections">
//     <div className="p-index_collection-wrapper ">
//       <h3>Collection 1</h3>
//       <h4>Sub Title</h4>
//     </div>
//   </Link>
// </div>