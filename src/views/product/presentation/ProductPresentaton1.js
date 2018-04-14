import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TabPane, TabContainer } from '../../../components/Tab';
import ImageGallery from '../../../components/Product/ImageGallery';

class ProductPresentation1 extends Component {

  render() {
    return (
      <div className="c-page">
        <p>Test Text</p>
        <div className="u-mh-large@md">
          <div className="c-panel u-flex">
            <ImageGallery className="u-1/2@sm u-mb-large u-mr-medium@sm">
              <img imgkey="12a1" src="https://cdn.shopify.com/s/files/1/0737/0479/products/google-pixel-2-parallax-burgundy-case-CO-GP2-ARM-CH-02.jpg?v=1515712330" alt=""/>
              <img imgkey="12f1" src="https://cdn.shopify.com/s/files/1/0737/0479/products/google-pixel-2-parallax-burgundy-case-CO-GP2-ARM-CH-02.jpg?v=1515712330" alt=""/>
              <img imgkey="12q31" src="https://cdn.shopify.com/s/files/1/0737/0479/products/google-pixel-2-parallax-burgundy-case-CO-GP2-ARM-CH-02.jpg?v=1515712330" alt=""/>
              <img imgkey="12r31" src="https://ant-mejia.github.io/atom/img/hero-items/Notebook.png" alt=""/>
              <img imgkey="12231" src="https://cdn.shopify.com/s/files/1/0737/0479/products/google-pixel-2-vault-black-case-CO-GP2-VLT-BK-02.jpg?v=1515712533" alt=""/>
              <img imgkey="123112" src="https://cdn.shopify.com/s/files/1/0737/0479/products/CO-ERP-HV806--00.jpg?v=1517016752" alt=""/>
              <img imgkey="12332311" src="https://cdn.shopify.com/s/files/1/0737/0479/products/iphone-8-plus-apex-2-black-case-CO-I8L-PEX-BKBK-00.jpg?v=1517001883" alt=""/>
            </ImageGallery>
            <div className="u-1/2@sm u-pl-medium@sm">
              <h1>{this.props.product.title}</h1>
              <h2>{this.props.formatPrice(this.props.product.price)}</h2>
              <p>{this.props.formatPrice(this.props.product.promoPrice)}</p>
              <p>{this.props.product.summary}</p>
            </div>
          </div>
          <div className="u-mt-xlarge">
            <TabContainer className="c-tab u-mv-large" navClass="c-tab_header" listClass="c-tab_header-item" selectedTabClassName="c-tab_header-item_active">
              <TabPane title="Description" className="c-tab_panel">
                <div dangerouslySetInnerHTML={ {__html: this.props.product.description}} />
              </TabPane>
              <TabPane title="Test Title" className="c-tab_panel">
                <h1>This is just the second Tab Pane!</h1>
                <p>Hello world!</p>
              </TabPane>
              <TabPane title="Reviews" className="c-tab_panel">
                {
                  this.props.product.productReviews.map((review) => {
                    return (
                      <div key={review.uid} className="u-mv-large">
                        <p>{review.rating}</p>
                        <h2>{review.title}</h2>
                        <p>{review.description}</p>
                        <p>Edited: {review.edited ? 'true' : 'false'}</p>
                      </div>
                    )
                  })
                }
                <Link to={`/products${this.props.product.path}/reviews`}>
                  <p>View Reviews</p>
                </Link>
              </TabPane>
            </TabContainer>
            <button onClick={this.props.addToCart}>Add to cart</button>
            <h3>Related Products</h3>
          </div>
        </div>
      </div>
    );
  }

}

export default ProductPresentation1;