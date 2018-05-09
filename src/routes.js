import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer';
import About from './views/About';
import Index from './views/Index';
import NotFound from './views/NotFound';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import AuthRoute from './containers/AuthRoute';
import Account from './views/auth/Account';
import Orders from './views/auth/Orders';
import Collection from './views/collection/Collection';
import Collections from './views/collection/Collections';
import ProductGallery from './views/product/ProductGallery';
import Cart from './views/cart/Cart';
import Search from './views/Search';
import NotificationContainer from './containers/NotificationContainer';
import ProductContainer from './containers/ProductContainer';
import CheckoutContainer from './containers/CheckoutContainer';
import Helmet from 'react-helmet';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = { stopScroll: false };
  }
  componentDidUpdate(prevProps, prevState) {

    this.props.history.listen(() => {
      let sc = this.refs.scrollContainer
      if (sc !== undefined) {
        if (sc.scrollTop !== 0) {
          sc.scrollTop = 0
        }
      }
    });

  }

  preventScroll = (e) => {
    console.log(e);
    if (this.state.stopScroll) {
      e.preventDefault();
      console.log('e');
    }
  }

  pageStackEnter = () => {
    return { opacity: 0 };
  }
  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Header isUserAuth={this.props.actions.isUserAuth} store={this.props.store} toggleHeader={this.props.actions.toggleHeader}/>
        <div className="c-page_container">
          {/* <div className="c-page_stack">
            <Page/>
          </div> */}
          <NotificationContainer closeNotification={this.props.actions.closeNotification} notifications={this.props.notifications}/>
          <div ref='scrollContainer' className={`c-page_wrapper ${this.state.stopScroll ? 'no-scroll' : ''}`}>
            <Switch location={this.props.history.location} className="transition-item">
              <Route exact path="/" render={({match, location}) => <Index actions={this.props.actions} store={this.props.store}/>} />
              <Route exact path="/about" component={About} />
              <Route exact path="/app" component={Index} />
              <Route exact path="/collections" render={({match, location}) => <Collections actions={this.props.actions} socket={this.props.socket}/>} />
              <Route path="/collections/:collection" render={({match, location}) => <Collection actions={this.props.actions} location={location} actions={this.props.actions} match={match} socket={this.props.socket}/>}/>
              <Route exact path="/products" render={({match, location}) => <ProductGallery actions={this.props.actions} store={this.props.store} socket={this.props.socket}/>} />
              <Route path="/products/:product" render={({match, location}) => <ProductContainer location={location} actions={this.props.actions} match={match} socket={this.props.socket}/>}/>
              <Route exact path="/search" render={({match}) => <Search socket={this.props.socket}/> } />
              <Route exact path="/cart" component={({match}) => <Cart store={this.props.store} actions={this.props.actions}/> } />
              <Route exact path="/login" component={({location, history}) => <Login location={location} actions={this.props.actions}/>} />
              <Route exact path="/register" component={({location, history}) => <Register location={location} actions={this.props.actions}/>} />
              <AuthRoute path="/account" actions={this.props.actions} store={this.props.store} component={() => <Account actions={this.props.actions} store={this.props.store}/>}/>
              <AuthRoute path="/orders" actions={this.props.actions} store={this.props.store} component={() => <Orders actions={this.props.actions} store={this.props.store}/>}/>
              <AuthRoute path="/checkout" actions={this.props.actions} store={this.props.store} component={CheckoutContainer}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </div>
      </div>
    )
  }
};

Routes.propTypes = {
  history: PropTypes.object.isRequired
};
export default Routes;