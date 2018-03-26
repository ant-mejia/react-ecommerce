import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import _ from 'lodash';
import ProductUnavailable from '../views/product/ProductUnavailable';
import NotFound from '../views/NotFound';
import ProductViewContainer from './ProductViewContainer';
import ProductReview from '../views/product/reviews/ProductReview';
import ProductReviews from '../views/product/reviews/ProductReviews';

class ProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.path = `/${this.props.match.params.product}`;
    this.props.socket.on('product/view', (response) => {
      if (response.type === 'success') {
        this.setStateOnMount({ product: response.data });
      } else {
        this.setStateOnMount({ product: {} })
        console.log('failure!', response);
      }
    })
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
    this.getProduct();
    if (this.preState !== undefined) {
      this.setState(this.preState);
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    let productMatch = this.props.match.params.product !== nextProps.match.params.product;
    let stateMatch = this.state !== nextState;
    let locationMatch = this.props.location !== nextProps.location;
    return productMatch || stateMatch || locationMatch;
  }

  componentDidUpdate(prevProps, prevState) {
    this.path = `/${this.props.match.params.product}`;
    if (this.props.match.params.product !== prevProps.match.params.product) {
      this.getProduct();
    }
  }

  getProduct = () => {
    this.setState({ product: undefined });
    this.props.actions.getProduct(this.path);
  }

  addToCart = () => {
    this.props.actions.addToCart(this.state.product.uid);
  }

  render() {
    if (this.state.product === undefined) {
      return <div className="c-page"/>
    } else if (typeof this.state.product === 'object') {
      if (this.state.product.uid === undefined) {
        return <NotFound/>
      } else if (this.state.product.availability === false) {
        return <ProductUnavailable product={this.state.product}/>
      }
    }
    return (
      <Switch location={this.props.location}>
        <Route exact path={this.props.match.path + '/reviews'} component={({match}) => <ProductReviews match={match} reviews={this.state.product.reviews}/>}/>
        <Route exact path={this.props.match.path + '/reviews/:review'} component={({match}) => <ProductReview match={match} reviews={this.state.product.reviews}/>}/>
        <Route path={this.props.match.path} component={() =>  <ProductViewContainer addToCart={this.addToCart} product={this.state.product}/>}/>
      </Switch>
    )

  }

}

export default ProductContainer;