import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { AnimatedSwitch } from 'react-router-transition';
import Header from '../components/Header'
import Footer from '../components/Footer';
import Page from '../components/Page';
import About from '../views/About';
import Index from '../views/Index';
import NotFound from '../views/NotFound';
import Login from '../views/auth/Login';

class RouteWrapper extends Component {

  componentDidMount() {
    this.props.history.listen(() => console.log('boom!'));
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <Header toggleHeader={this.toggleHeader}/>
        <div className="c-page_container">
          <div className="c-page_wrapper">
            <Switch onEnter={() => {console.log('bb');}}>
              <Route exact path="/" component={Index} />
              <Route exact path="/about" component={About} />
              <Route exact path="/app" component={Index} />
              <Route exact path="/login" component={({location, history}) => <Login location={location} actions={this.props.actions}/>} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RouteWrapper);
