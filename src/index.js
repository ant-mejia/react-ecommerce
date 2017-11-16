import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Link } from 'react-router-dom';
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
    this.socket.on('user/login', (response) => {
      if (response.type === 'success') {
        this.setStore({
          user: response.data,
        });
        console.log('response: ', response);
        this.setStorage('jwa', response.data.jwt);
      }
    })
  }
  componentDidMount() {
    console.log(store.get('jwa'));
  }
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
      console.log(key);
      newStore[key] = obj[key];
    });
    this.setState({
      store: newStore
    })
  }

  listenHistory = () => {
    console.log('oh yeah!');
    this.socket.emit('session/view', { path: this.history.location.pathname, type: 'test' })
    this.setState({
      activeHeader: false
    });
  }

  isUserAuth = () => {
    return this.state.store.user !== undefined;
  }

  toggleHeader = () => {
    this.setState({ activeHeader: !this.state.activeHeader })
  }

  loginUser = (email, password) => {
    console.log(email, password);
    this.socket.emit('auth/login', { type: 'email', data: { email: 'a@antmejia.com', password: 'adasdsa' } })
  }

  registerUser = () => {
    console.log('user registered');
    this.socket.emit('auth/register', { email: 'ant@antmejia.com' })
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
      <Routes actions={this.actions()} activeHeader={this.state.activeHeader} store={this.state.store} history={this.history}/>
    );
  }

}

export default App;

ReactDOM.render(<App/>, document.getElementById('root'));
