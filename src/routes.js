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
import Profile from './views/auth/Profile';

class Routes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('routes mounted!');
    console.log(this.props);
  }

  pageStackEnter = () => {
    return { opacity: 0 };
  }
  render() {
    return (
      <div id="app" className={this.props.activeHeader ? 'header_active' : ''}>
        <Router history={this.props.history}>
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
                  <AuthRoute path="/profile" actions={this.props.actions} store={this.props.store} user={'adaad'} component={() => <Profile isUserAuth={this.isUserAuth}/>}/>
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </div>
    )
  }
};
Routes.propTypes = {
  history: PropTypes.object.isRequired
};
export default Routes;
