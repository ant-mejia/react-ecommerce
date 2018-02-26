import React, { Component } from 'react';
import { Router } from 'react-router-dom';
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
      store: {},
      notifications: []
    };
    this.history.listen(this.listenHistory);
    this.socket = io('http://localhost:3030');
    this.socket.on('connect', () => {
      this.listenHistory();
      this.socket.emit('cart', { method: 'get' })
    });
    this.socket.on('user/login', (response) => {
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

    this.socket.on('update/cart', (response) => {
      console.log(response.data);
      if (response.type === 'success') {
        this.setStore('cart', response.data)
      }
    })
    this.socket.on('session/notify', (response) => {
      if (response.type === 'success') {
        let notifications = this.state.notifications;
        notifications.push(response.data);
        console.log('notifications: ', notifications);
        console.log('New notifications: ', 'newNotifications');
        this.setState({ notifications: notifications });
      }
    });

    this.socket.on('cart/update', (cart) => {
      console.log(cart);
    })
  }
  componentWillMount() {
    if (this.getStorage('jtk') !== undefined && this.getStore('user') === undefined) {
      this.setState({ waiting: true });
      this.socket.emit('auth/authenticate', this.getStorage('jtk'));
    };
    console.log(this.getStorage('jtk'), this.getStore('user'));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.getStore('cart') === undefined) {
      if (this.getStorage('jtk') === undefined && this.getStorage('gct') === undefined) {
        // get a token for a guest user cart
        // store it via localstorage
        // set cart to empty Object
      } else if (this.getStorage('jtk') === undefined && this.getStorage('gct')) {
        // emit token to server to get guest cart
        // upon retrival, set store - cart - to response object
      } else if (this.getStorage('jtk') !== undefined) {
        this.socket.emit('cart', { action: 'get', data: { userToken: this.getStorage('jtk') } })
        this.setStore('cart', null)
        // emit token to server to verify user
        // if response is successful, set cart to response data
        // if response is an error, make sure to remove the token and leave cart store undefined
      }
    } else if (this.getStore('cart')) {
      if (this.getStorage('jtk') === undefined) {
        this.setStore('cart', undefined)
      }
    }
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
    this.socket.emit('session/notification', {
      type: 'create',
      data: obj
    })
  }

  testNotification = () => {
    let obj = {
      status: 'primary',
      title: 'Title Notification',
      message: 'This is just a test message',
      priority: false
    }
    this.addNotification(obj)
  }

  closeNotification = (uid) => {
    this.socket.emit('session/notification', {
      type: 'close',
      data: { uid: uid }
    })
  }

  renderNotification = () => {

  }

  getProduct = (path) => {
    this.socket.emit('session/:param', { parameter: "products", path })
  }

  addToCart = (productId) => {
    let parcel = {
      action: 'add',
      data: {
        product: {
          uid: productId
        }
      }
    };
    this.socket.emit('cart', parcel)
  }
  removeFromCart = (cartId) => {
    let parcel = {
      action: 'remove',
      data: {
        cart: {
          uid: cartId
        }
      }
    };
    this.socket.emit('cart', parcel)
  }

  checkoutUser = () => {
    console.log('boo');
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