import React, { Component } from 'react';
import ScrollLock from 'react-scrolllock';
import View from '../containers/View'
import { Link } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron/Jumbotron';

class Index extends Component {

  jumbotronContent = [{
    background: { src: 'https://www.screenaustralia.gov.au/sacms/media/samedialibrary/screenguide/titles/tid33797-mountain/tid33797-web/tid33797-mountain-001-hero.jpg', alt: 'Blah Blah Blah' },
    subheading: 'Tiny ass heading',
    heading: 'Alan Watts',
    title: 'I owe my solitude to other people.',
    summary: 'Some believe all that parents, tutors, and kindred believe. They take their principles by inheritance, and defend them as they would their estates, because they are born heirs to them.',
    link: { text: 'Shop Product', href: '/products/test-product' }
  }, {
    background: { src: 'https://revolutioncdn-themepunchgbr.netdna-ssl.com/wp-content/uploads/revslider/overexposure/exp_bg2.jpg', alt: 'Blah Blah Blah' },
    subheading: 'Tiny ass heading',
    heading: 'Anthony Mejia',
    title: 'I owe my solitude to my Past.',
    summary: 'Some believe all that parents, tutors, and kindred believe. They take their principles by inheritance, and defend them as they would their estates, because they are born heirs to them.',
    link: { text: 'Shop Beta', href: '/products/test-product' }
  }, {
    background: { src: 'https://revolutioncdn-themepunchgbr.netdna-ssl.com/wp-content/uploads/revslider/overexposure/exp_bg5.jpg', alt: 'Blah Blah Blah' },
    subheading: 'Tiny ass heading',
    heading: 'Alan Miller',
    title: 'I owe my solitude to other people.',
    summary: 'Some believe all that parents, tutors, and kindred believe. They take their principles by inheritance, and defend them as they would their estates, because they are born heirs to them.',
    link: { text: 'Shop Product', href: '/products/test-product' }
  }, {
    background: { src: 'https://revolutioncdn-themepunchgbr.netdna-ssl.com/wp-content/uploads/revslider/overexposure/exp_bg5.jpg', alt: 'Blah Blah Blah' },
    subheading: 'Tiny ass heading',
    heading: 'Miller Mejia',
    title: 'I owe my solitude to my future.',
    summary: 'Some believe all that parents, tutors, and kindred believe. They take their principles by inheritance, and defend them as they would their estates, because they are born heirs to them.',
    link: { text: 'Shop Beta', href: '/products/test-product' }
  }]

  render() {
    return (
      <div>
        {/* <PageHeader/> */}
        <div className="c-page_jumbotron">
          <Jumbotron type="creative" content={this.jumbotronContent}/>
        </div>
        <View classNames="p-index">
          <div className="p-index_section">
            <h1>Featured Collections</h1>
            <h3>This is just a lil sub heading</h3>
            <div>
              <div className="p-index_collections">
                <div className="p-index_collection-container">
                  <div className="p-index_collection">
                    <div className="p-index_collection-background">
                      <img src="http://d29u17ylf1ylz9.cloudfront.net/mimosa/img/banner/4.jpg" alt=""/>
                    </div>
                    <Link to="/collections">
                      <div className="p-index_collection-wrapper ">
                        <h3>Collection 2</h3>
                        <h4>Sub Title</h4>
                      </div>
                    </Link>
                  </div>
                  <div className="p-index_collection">
                    <div className="p-index_collection-background">
                      <img src="http://d29u17ylf1ylz9.cloudfront.net/mimosa/img/banner/4.jpg" alt=""/>
                    </div>
                    <Link to="/collections">
                      <div className="p-index_collection-wrapper ">
                        <h3>Collection 3</h3>
                        <h4>Sub Title</h4>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="p-index_collection p-index_collection-featured">
                  <div className="p-index_collection-background">
                    <img src="http://d29u17ylf1ylz9.cloudfront.net/mimosa/img/banner/4.jpg" alt=""/>
                  </div>
                  <Link to="/collections">
                    <div className="p-index_collection-wrapper ">
                      <h3>Collection 1</h3>
                      <h4>Sub Title</h4>
                    </div>
                  </Link>
                </div>
                <div className="p-index_collection-container">
                  <div className="p-index_collection">
                    <div className="p-index_collection-background">
                      <img src="http://d29u17ylf1ylz9.cloudfront.net/mimosa/img/banner/4.jpg" alt=""/>
                    </div>
                    <Link to="/collections">
                      <div className="p-index_collection-wrapper ">
                        <h3>Collection 4</h3>
                        <h4>Sub Title</h4>
                      </div>
                    </Link>
                  </div>
                  <div className="p-index_collection">
                    <div className="p-index_collection-background">
                      <img src="http://d29u17ylf1ylz9.cloudfront.net/mimosa/img/banner/4.jpg" alt=""/>
                    </div>
                    <Link to="/collections">
                      <div className="p-index_collection-wrapper ">
                        <h3>Collection 5</h3>
                        <h4>Sub Title</h4>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <Link to="/collections">
                <h2>View All Collections</h2>
              </Link>
            </div>
          </div>
          <div className="p-index_section">
            <h5>Next Section</h5>
            <h1>Featured Products</h1>
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