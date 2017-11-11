import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './style/main.css';

// import Routes from './containers/RouteContainer';
import createHistory from 'history/createBrowserHistory'
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
// import { Provider } from 'react-redux';
// import { applyMiddleware, createStore } from 'redux';
// import { createLogger } from 'redux-logger';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';
//
// import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
let socket = io('http://localhost:3030');
// let socketIoMiddleware = createSocketIoMiddleware(socket, ['auth/', 'session/', 'product/']);
//
// function reducer(state = {}, action) {
//   switch (action.type) {
//     case 'message':
//       return Object.assign({}, { message: action.data });
//     default:
//       return state;
//   }
// }
// let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);
// store.subscribe(() => {
//   console.log('new client state', store.getState());
// });
// store.dispatch({ type: 'auth/login', data: { username: 'antmejia', password: 'asdadasd' } });
// store.dispatch({ type: 'session/event', data: 'Hello!' });
// store.dispatch({ type: 'product/view', data: { itemId: 'asdadedawadawafafaaTEST{PRODUCT}' } });
//
// const history = createHistory();
// const historyMiddleware = routerMiddleware(history);
//
// const middleware = applyMiddleware(thunk, createLogger());
// export default store = createStore(rootReducer, middleware);

ReactDOM.render(
  <div>
    <Routes/>
  </div>,
  document.getElementById('root')
);
