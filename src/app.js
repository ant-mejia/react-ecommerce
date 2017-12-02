import React, { Component } from 'react';
import { Router, Redirect, Link } from 'react-router-dom';

import store from 'store';

import Routes from './routes';
import './style/main.css';

import io from 'socket.io-client';
import createHistory from 'history/createBrowserHistory';

class App extends Component {
  history = createHistory();
  constructor(props) {
    super(props);
    this.state = {
      activeHeader: false,
      store: {}
    };
    this.history.listen(this.listenHistory);
    this.socket = io('http://localhost:3030');
    this.socket.on('connect', () => {
      this.socket.emit('message', { data: 'socket connected!' });
      this.socket.emit('session/view', { path: this.history.location.pathname, type: 'test' })
    });
  }
  componentDidMount() {}
  setStorage = (key, value) => {
    store.set(key, value)
  }

  getStorage = (key) => {
    if (key === undefined) {
      let allKeys = [];
      store.each(function(value, key) {
        allKeys.push({ key, value })
      })
      return allKeys;
    }
    return store.get(key);
  }

  setStore = (obj) => {
    let keys = Object.keys(obj);
    let newStore = { ...this.state.store };
    keys.map((key) => {
      newStore[key] = obj[key];
    });
    this.setState({
      store: newStore
    })
  }

  listenHistory = () => {
    this.socket.emit('session/view', { path: this.history.location.pathname, type: 'test' })
    this.setState({
      activeHeader: false
    });
  }

  isFunction = (functionToCheck) => {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  isUserAuth = () => {
    return this.state.store.user !== undefined;
  }

  toggleHeader = () => {
    this.setState({ activeHeader: !this.state.activeHeader })
  }

  loginUser = (email, password, cb) => {
    this.socket.emit('auth/login', { type: 'email', data: { email: 'a@antmejia.com', password: 'adasdsa' } })
    this.socket.on('user/login', (response) => {
      if (response.type === 'success') {
        if (this.isFunction(cb)) {
          cb(response);
        }
        this.setStore({
          user: response.data,
        });
        this.setStorage('jwa', response.data.jwt);
      }
    });
  }

  registerUser = (user) => {
    this.socket.emit('auth/register', { user })
  }

  actions = () => {
    let methods = {}
    let keys = Object.keys(this)
    keys.map((item) => {
      if (typeof this[item] === 'function' && item !== 'actions') {
        methods[item] = this[item]
      }
    })
    return methods;
  }

  render() {
    return (
      <div id="app" className={this.activeHeader ? 'header_active' : ''}>
        <Router history={this.history}>
          <Routes actions={this.actions()} activeHeader={this.state.activeHeader} store={this.state.store} history={this.history}/>
        </Router>
      </div>
    );
  }

}

export default App;