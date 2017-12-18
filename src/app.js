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
      store: {},
      notifications: []
    };
    this.history.listen(this.listenHistory);
    this.socket = io('http://localhost:3030');
    this.socket.on('connect', () => {
      this.listenHistory();
    });
    this.socket.on('user/login', (response) => {
      console.log(response);
      this.setState({ waiting: undefined });
      if (response.type === 'success') {
        this.setStore('user', response.data);
        if (response.method !== 'auto') {
          this.setStorage('jtk', response.data.token);
        }
        // resolve(response.data)
      } else if (response.type === 'error') {
        console.log(response.error.message);
        if (response.method === 'auto') {
          this.removeStorage('jtk');
        }
      }
    });
    this.socket.on('session/notify', (response) => {
      if (response.type === 'success') {
        let notifications = this.state.notifications;
        notifications.push(response.data);
        console.log('notifications: ', notifications);
        console.log('New notifications: ', 'newNotifications');
        this.setState({ notifications: notifications });

      }
    });
  }
  componentWillMount() {
    if (this.getStorage('jtk') !== undefined && this.getStore('user') === undefined) {
      this.setState({ waiting: true });
      this.socket.emit('auth/authenticate', this.getStorage('jtk'));
    };
  }

  componentDidMount() {}

  setStorage = (key, value) => {
    if (value === null) {
      store.remove(key);
    } else {
      store.set(key, value);
    }
  }

  removeStorage = (item) => {
    store.remove(item);
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

  setStore = (obj, temp) => {
    if (temp !== undefined || temp !== null) {
      let newStore = { ...this.state.store };
      newStore[obj] = temp;
      this.setState({ store: newStore })
    } else {
      let keys = Object.keys(obj);
      let newStore = { ...this.state.store };
      keys.map((key) => {
        newStore[key] = obj[key];
      });
      this.setState({
        store: newStore
      })
    }
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
        // this.socket.emit('auth/authenticate', {
        //   method,
        //   user: this.state.store.user
        // })
      }
    }
    return this.state.store.user !== undefined
  };

  toggleHeader = () => {
    this.setState({ activeHeader: !this.state.activeHeader })
  }

  loginUser = (email, password) => {
    this.socket.emit('auth/login', { type: 'email', data: { email, password } });
  }

  logoutUser = () => {
    this.socket.emit('auth/logout', this.getStore('user').uid);
    this.setStore('user', undefined);
    this.setStorage('jtk', undefined);
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

  addNotification = (obj) => {
    this.socket.emit('session/notification', obj)
  }

  renderNotification = () => {

  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    if (this.state.waiting === true) {
      return <div/>
    }
    return (
      <div id="app" className={this.state.activeHeader ? 'header_active' : ''}>
        <Router history={this.history}>
          <Routes actions={this.actions()} activeHeader={this.state.activeHeader} store={this.state.store} socket={this.socket} notifications={this.state.notifications} history={this.history}/>
        </Router>
      </div>
    );
  }

}

export default App;