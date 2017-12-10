import React, { Component } from 'react';
import { Router, Redirect, Link } from 'react-router-dom';

import store from 'store';

import Routes from './routes';
import './style/main.css';

import _ from 'lodash'
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
      this.listenHistory();
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

  getStore = (prop) => {
    return this.state.store[prop];
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

  isUserAuth = (method) => {
    if (this.getStore('user') !== undefined) {
      if (method === 'strict') {
        this.socket.emit('auth/authenticate', {
          method,
          user: this.state.store.user
        })
      }
    }
    return this.state.store.user !== undefined
  };

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

  actions = (arr = []) => {
    if (typeof arr === 'string') {
      let newArray = [arr];
      arr = newArray;
    }
    let methods = {}
    let keys = Object.keys(this)
    keys.map((item) => {
      if (typeof this[item] === 'function' && item !== 'actions') {
        let included = false;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] === item) {
            included = true;
          }
        }
        if (included === false) {
          methods[item] = this[item];
        }
      }
    })
    return methods;
  }

  render() {
    console.log(_.has(this.state.store.user, 'jwt'));
    return (
      <div id="app" className={this.state.activeHeader ? 'header_active' : ''}>
        <Router history={this.history}>
          <Routes actions={this.actions()} activeHeader={this.state.activeHeader} store={this.state.store} history={this.history}/>
        </Router>
      </div>
    );
  }

}

export default App;