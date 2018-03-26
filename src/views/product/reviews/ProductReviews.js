import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import View from '../../../containers/View';
import 'react-quill/dist/quill.snow.css';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class ProductReviews extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleChange = (content, delta, source, editor) => {
    console.log("content :: ", content, "delta :: ", delta, "source :: ", source, "editor :: ", editor);
    this.setState({ text: content })
  }
  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  render() {
    console.log(this.props.match);
    return (
      <View>
        <h1>Product Reviews!</h1>
        <Link to={`/products/${this.props.match.params.product}`}>
          <h4>Back To Product</h4>
        </Link>
        <div>
          <ReactQuill modules={this.modules} value={this.state.text} onChange={this.handleChange}/>
        </div>
        <div>
          {ReactHtmlParser(this.state.text)}
        </div>
        <div>
          {
            this.props.reviews.map((review) => {
              return (
                <div key={review.uid} className="u-mt-large">
                  <p>{review.rating}</p>
                  <Link to={`/products/test-product/reviews/${review.uid}`}>
                    <h2>{review.title}</h2>
                  </Link>
                  <p>{review.description}</p>
                  <p>Edited: {review.edited ? 'true' : 'false'}</p>
                </div>
              )
            })
          }
        </div>
      </View>
    );
  }
}

export default ProductReviews;