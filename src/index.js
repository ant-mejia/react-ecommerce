import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './style/main.css';
import io from 'socket.io-client';
let socket = io('http://localhost:3030');
ReactDOM.render(
  <div>
    <Routes/>
  </div>,
  document.getElementById('root')
);
