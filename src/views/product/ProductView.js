import React, { Component } from 'react';

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.socket.on('')
  }

  componentWillUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  componentWillMount() {
    this.props.socket.emit('product/view', {
      path: `/${this.props.match.params.product}`
    })
  }


  render() {
    console.log(this.props.match.params.product);
    return (
      <div className="c-page">
        <h1>Page!</h1>
        <h2>Product: {this.props.match.params.product}</h2>
      </div>
    );
  }

}

export default ProductView;