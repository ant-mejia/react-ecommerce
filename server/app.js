// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();
var http = require('http');
var server = http.createServer();
var socketio = require('socket.io');
server.listen(3030);
var io = socketio();
io.attach(server);
io.on('connection', (socket) => {
  console.log("Socket connected: " + socket.id);
  socket.on('action', (action) => {
    if (action.type === 'server/hello') {
      console.log('Got hello data!', action.data);
      socket.emit('action', { type: 'message', data: 'good day!' });
    }
  });
});

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//json parser
app.use(bodyParser.json())
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))
  // Serve our api
  .use('/api', require('./api'))

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
