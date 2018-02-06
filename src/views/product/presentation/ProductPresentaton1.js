import React, { Component } from 'react';
import { TabPane, TabContainer } from '../../../components/Tab';
import ImageGallery from '../../../components/Product/ImageGallery';

class ProductPresentation1 extends Component {

  render() {
    return (
      <div className="c-page">
        <p>Test Text</p>
        <div className="u-mh-large">
          <div className="u-flex">
            <ImageGallery className="u-1/2 u-pr-medium">
              <img imgkey="12a1" src="https://cdn.shopify.com/s/files/1/0737/0479/products/google-pixel-2-parallax-burgundy-case-CO-GP2-ARM-CH-02.jpg?v=1515712330" alt=""/>
              <img imgkey="12f1" src="https://cdn.shopify.com/s/files/1/0737/0479/products/google-pixel-2-parallax-burgundy-case-CO-GP2-ARM-CH-02.jpg?v=1515712330" alt=""/>
              <img imgkey="12q31" src="https://cdn.shopify.com/s/files/1/0737/0479/products/google-pixel-2-parallax-burgundy-case-CO-GP2-ARM-CH-02.jpg?v=1515712330" alt=""/>
              <img imgkey="12r31" src="https://cdn.shopify.com/s/files/1/0737/0479/products/google-pixel-2-parallax-burgundy-case-CO-GP2-ARM-CH-02.jpg?v=1515712330" alt=""/>
              <img imgkey="12231" src="https://cdn.shopify.com/s/files/1/0737/0479/products/google-pixel-2-vault-black-case-CO-GP2-VLT-BK-02.jpg?v=1515712533" alt=""/>
              <img imgkey="123112" src="https://cdn.shopify.com/s/files/1/0737/0479/products/CO-ERP-HV806--00.jpg?v=1517016752" alt=""/>
              <img imgkey="12332311" src="https://cdn.shopify.com/s/files/1/0737/0479/products/iphone-8-plus-apex-2-black-case-CO-I8L-PEX-BKBK-00.jpg?v=1517001883" alt=""/>
            </ImageGallery>
            <div className="u-1/2 u-pl-medium">
              <h1>{this.props.product.title}</h1>
              <h2>{this.props.product.price}</h2>
              <p>{this.props.product.promoPrice}</p>
              <p>{this.props.product.summary}</p>
            </div>
          </div>
          <div className="u-mt-xlarge">
            <TabContainer className="u-m-large">
              <TabPane title="Test Title">
                <h1>This is just the first Tab Pane!</h1>
                <p>Hello world!</p>
              </TabPane>
              <TabPane title="Test Title">
                <h1>This is just the second Tab Pane!</h1>
                <p>Hello world!</p>
              </TabPane>
            </TabContainer>
            <p>{this.props.product.description}</p>
            <button onClick={this.props.addToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    );
  }

}

export default ProductPresentation1;