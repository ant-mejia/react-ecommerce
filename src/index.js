import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './containers/AppContainer';

import './style/main.css';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
let socket = io('http://localhost:3030');
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

function reducer(state = {}, action) {
  switch (action.type) {
    case 'message':
      return Object.assign({}, { message: action.data });
    default:
      return state;
  }
}
let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);
store.subscribe(() => {
  console.log('new client state', store.getState());
});
store.dispatch({ type: 'server/hello', data: 'Hello!' });

const middleware = applyMiddleware(thunk, createLogger());
export default store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
