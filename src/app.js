import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import store from 'store';
import actions from './actions/index';
import Routes from './routes';
import './style/main.css';
import io from 'socket.io-client';
import createHistory from 'history/createBrowserHistory';
const pkg = require('../package.json')
class App extends Component {
  history = createHistory();
  constructor(props) {
    super(props);
    Object.assign(this, actions)
    this.state = {
      activeHeader: false,
      store: {},
      cache: {},
      notifications: []
    };
    this.history.listen(this.listenHistory);
    const genUrl = () => {
      if (window.location.hostname === 'localhost') {
        return `localhost:${8000}`
      }
      return undefined;
    }
    let url = genUrl();
    this.socket = io(genUrl());
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

    this.socket.on('user/verify', (data) => {
      if (data.request === 'token') {
        if (this.getStorage('jtk') !== undefined && this.getStore('user') !== undefined) {
          this.socket.emit('auth/authenticate', this.getStorage('jtk'));
        };
      }
    })

    this.socket.on('update/cart', (response) => {
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

  setCache = (obj, temp) => {
    if (temp !== undefined || temp !== null) {
      let newCache = { ...this.state.cache };
      newCache[obj] = temp;
      this.setState({ cache: newCache })
    } else {
      let keys = Object.keys(obj);
      let newCache = { ...this.state.cache };
      keys.map((key) => {
        newCache[key] = obj[key];
      });
      this.setState({
        cache: newCache
      })
    }
  }

  getCache = (prop) => {
    //if property has a dot "." in the string
    //  map through each one
    if (~prop.indexOf(".")) {
      let subProps = prop.split('.');
      let result = this.state.cache;
      subProps.map((item, iterator) => {
        if (result[item] !== undefined) {
          result = result[item];
        }
      });
      return result;
    }
    return this.state.cache[prop];
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
    //if property has a dot "." in the string
    //  map through each one
    if (~prop.indexOf(".")) {
      let subProps = prop.split('.');
      let result = this.state.store;
      subProps.map((item, iterator) => {
        if (result[item] !== undefined) {
          result = result[item];
        }
      });
      return result;
    }
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

  getProductByPath = (path) => {
    this.socket.emit('session/:param', { parameter: "product", path })
  }
  getProducts = () => {
    this.socket.emit('session/:param', { parameter: "products", data: {} })
  }
  getCollectionByPath = (path) => {
    this.socket.emit('session/:param', { parameter: "collection", data: { path } })
  }
  getCollections = () => {
    this.socket.emit('session/:param', { parameter: "collections", data: {} })
  }

  formatPrice = (price) => {
    if (price === undefined) {
      return undefined;
    }
    let p = price / 100;
    let fixedPrice = p.toFixed(0);
    if (p.toFixed(2).toString().split('.')[1] !== '00') {
      fixedPrice = p.toFixed(2);
    }
    return `$${fixedPrice}`;
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

  userCheckout = () => {
    console.log('boo');
    this.socket.emit('checkout', {
      data: 'vars!'
    })
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
          <Routes actions={this.actions()} store={this.state.store} socket={this.socket} notifications={this.state.notifications} history={this.history}/>
        </Router>
      </div>
    );
  }

}

export default App;
