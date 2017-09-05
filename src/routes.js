import React from 'react';
import Header from './components/Header'
import App from './containers/AppContainer';
import About from './components/About/About';
import Index from './views/Index';
import NotFound from './views/NotFound';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <div id="app">
      <Router>
        <div>
          <Header/>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/about" component={About} />
            <Route exact path="/app" component={App} />
            <Route component={NotFound} />
          </Switch>
          <footer>Lorem</footer>
        </div>
      </Router>
    </div>
  )
};

export default Routes;
