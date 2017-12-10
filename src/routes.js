import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer';
import Page from './components/Page';
import About from './views/About';
import Index from './views/Index';
import NotFound from './views/NotFound';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import AuthRoute from './containers/AuthRoute';
import Account from './views/auth/Account';

class Routes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log('routes mounted!');
  }

  pageStackEnter = () => {
    return { opacity: 0 };
  }
  render() {
    return (
      <div>
        <Header toggleHeader={this.props.actions.toggleHeader}/>
        <div className="c-page_container">
          {/* <div className="c-page_stack">
            <Page/>
          </div> */}
          <div className="c-page_wrapper">
            <Switch onEnter={() => {console.log('bb');}}>
              <Route exact path="/" component={Index} />
              <Route exact path="/about" component={About} />
              <Route exact path="/app" component={Index} />
              <Route exact path="/login" component={({location, history}) => <Login location={location} actions={this.props.actions}/>} />
              <Route exact path="/register" component={({location, history}) => <Register location={location} actions={this.props.actions}/>} />
              <AuthRoute path="/account" psda={'sadas'} actions={this.props.actions} store={this.props.store} component={() => <Account actions={this.props.actions} store={this.props.store}/>}/>
              <Route component={NotFound}/>
            </Switch>
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