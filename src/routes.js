import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { AnimatedSwitch } from 'react-router-transition';
import Header from './components/Header'
import Footer from './components/Footer';
import Page from './components/Page';
import App from './containers/AppContainer';
import About from './views/About';
import Index from './views/Index';
import NotFound from './views/NotFound';


class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeHeader: false
    };
  }
  toggleHeader = () => {
    this.setState({ activeHeader: !this.state.activeHeader })
  }

  pageStackEnter = () => {
    return { opacity: 0 };
  }
  render() {
    return (
      <div id="app" className={this.state.activeHeader ? 'header_active' : ''}>
        <Router>
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
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
            {/* <Footer/> */}
          </div>
        </Router>
      </div>
    )
  }
};

export default Routes;
