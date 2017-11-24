const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const passportLocal = require('./auth/local');
const db = require('../db/index');
const app = express();
const models = require('../db/models/index');
const passport = require('passport');
require('dotenv').config();
const authHelpers = require('./auth/auth-helpers');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const slogger = require('slogged')
const moment = require('moment');
const sessionManager = require('./managers/sessionManager');
const authManager = require('./managers/authManager');
const helpers = require('./helpers');
var get_ip = require('ipware')().get_ip;
// Setup logger
var logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// let stream = rfs('file.log', { size: '10M', interval: '1d', path: logDirectory });

morgan.token('type', function(req, res) { return req.user ? req.user.email : 'anonymous' });
morgan.token('moment', function(req, res) { return moment().format("MM/DD/YYYY h:mm:ss a Z") });
app.use(morgan(':remote-addr - :type :referrer :moment ":method :url HTTP/:http-version" :status :response-time ms'));
// app.use(morgan(':remote-addr - :type :referrer :moment ":method :url HTTP/:http-version" :status :response-time ms', {
// stream: stream
// }));
io.use(slogger());
io.engine.generateId = (req) => {
  return helpers.generateUid(); // custom id must be unique
}
// OLD!
server.listen(3030);

io.on('connection', (socket) => {
  console.log(process.env.SK);
  sessionManager.createSession(socket);
  console.log("Socket connected: " + socket.id);
  socket.on('session/view', (data) => {
    sessionManager.createView(socket, {
      path: data.path,
      type: data.type
    })
  });
  socket.on('auth/login', (data) => {
    socket.emit('user/login', authManager.loginUser());
  });
  socket.on('auth/register', (data) => {
    let successCallback = (data) => {
      let payload = {
        type: 'success',
        data
      }
      socket.emit('user/auth', payload)
    }
    let failureCallback = (arg) => {
      console.log('failed callback!');
    }
    authManager.createUser(data.user, successCallback, failureCallback)
  })
  socket.on('action', (action) => {
    if (action.type === 'auth/hello') {
      console.log('Got hello data!', action.data);
      socket.emit('action', { type: 'auth/signin', data: 'good day!' });
    } else if (action.type === 'server/event') {
      sessionManager.createEvent(socket, {
        type: 'asdsadad',
        target: 'asdsadad',
        originUrl: 'asdsadad',
        targetUrl: 'asdsadad',
        description: 'adss'
      }, (as) => {
        console.log('success!!');
      })
    } else {
      console.log(action);
    }
  });

  socket.on('disconnect', (reason) => {
    sessionManager.endSession(socket)
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
