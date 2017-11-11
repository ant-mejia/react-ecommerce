import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch, Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { AnimatedSwitch } from 'react-router-transition';
import Header from './components/Header'
import Footer from './components/Footer';
import Page from './components/Page';
import About from './views/About';
import Index from './views/Index';
import NotFound from './views/NotFound';
import Login from './views/auth/Login';


class Routes extends Component {

  history = createHistory();

  constructor(props) {
    super(props);
    this.state = {
      activeHeader: false
    };
  }

  componentDidMount() {
    console.log('routes mounted!');
    console.log(this.props)

    this.history.listen(this.listenHistory);
  }

  listenHistory = () => {
    console.log('oh yeah!');
    // this.props.store.dispatch({ type: 'auth/hello', data: 'Page Viewed!' });
    this.setState({
      activeHeader: false
    });
  }

  toggleHeader = () => {
    this.setState({ activeHeader: !this.state.activeHeader })
  }

  pageStackEnter = () => {
    return { opacity: 0 };
  }
  render() {
    const { match, location, history } = this.props;
    // console.log(window.location.watch(item => console.log(item)));
    return (
      <div id="app" className={this.state.activeHeader ? 'header_active' : ''}>
        <Router history={this.history}>
          <div>
            <Header toggleHeader={this.toggleHeader}/>
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

export default Routes;
