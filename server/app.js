const express = require('express');
const cookieParser = require('cookie-parser')
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
const passportSocketIo = require('passport.socketio');
const slogger = require('slogged')
const moment = require('moment');
const sessionManager = require('./managers/sessionManager');
const authManager = require('./managers/authManager');
const socketManager = require('./managers/socketManager');
const helpers = require('./helpers');
const Sifter = require('sifter');
var get_ip = require('ipware')().get_ip;
// Setup logger
var logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// let stream = rfs('file.log', { size: '10M', interval: '1d', path: logDirectory });

morgan.token('type', function(req, res) { return req.user ? req.user.email : 'anonymous' });
morgan.token('moment', function(req, res) { return moment().format('MM/DD/YYYY h:mm:ss a Z') });
app.use(morgan(':remote-addr - :type :referrer :moment ":method :url HTTP/:http-version" :status :response-time ms'));
// app.use(morgan(':remote-addr - :type :referrer :moment ":method :url HTTP/:http-version" :status :response-time ms', {
// stream: stream
// }));
io.use(slogger());
io.engine.generateId = () => {
  return helpers.generateUid(); // custom id must be unique
}
// OLD!
server.listen(3030);

io.on('connection', (socket) => {
  socketManager.logIt('item');
  sessionManager.createSession(socket);
  console.log("Socket connected: " + socket.id);
  socket.on('session/view', (data) => {
    sessionManager.createView(socket, {
      path: data.path,
      type: data.type
    })
  });
  socket.on('auth/authenticate', (token) => {
    helpers.verifyToken(token)
      .then((user) => {
        let credentials = { email: user.email, password: user.password }
        authManager.loginUser(credentials, 'auto').then((user) => {
            socket.emit('user/login', socketManager.sendData('success', user));
            authManager.logUser('login', 'auto-login', 'server-side', { userUid: user.uid, sessionUid: socket.id })
            sessionManager.bindUser(socket, user.uid);
          })
          .catch((err) => {
            socket.emit('user/login', socketManager.sendError(err));
          });
      })
      .catch((err) => {
        let error = socketManager.sendError(err);
        error.method = 'auto';
        socket.emit('user/login', error);
      })
  })
  socket.on('auth/login', (data) => {
    console.log(data);
    authManager.loginUser(data.data)
      .then((data) => {
        socket.emit('user/login', socketManager.sendData('success', data));
        authManager.logUser('login', 'button-click', 'client-side', { userUid: data.uid, sessionUid: socket.id })
        sessionManager.bindUser(socket, data.uid);
      })
      .catch((err) => {
        socket.emit('user/login', socketManager.sendError(err));
      });
  });

  socket.on('auth/logout', (userId) => {
    authManager.logoutUser(userId);
    authManager.logUser('logout', 'button-click', 'client-side', { userUid: userId, sessionUid: socket.id })
  });

  socket.on('auth/register', (data) => {
    authManager.createUser(data.user)
      .then((user) => {
        console.log('user created! ::: ', user);
        socket.emit('user/login', socketManager.sendData('success', user, 'auto'));
      })
      .catch((err) => {
        // send error
        console.log(err.message);
      })
  });

  socket.on('search', (search) => {
    models.product.findAll().then((products) => {
      let productArray = products.map((prd) => {
        return prd.dataValues;
      })
      var sifter = new Sifter(productArray);
      var result = sifter.search(search.query, {
        fields: ['title', 'description'],
        sort: [{ field: 'title', direction: 'asc' }],
        limit: 3
      });
      let items = result.items.map((obj) => {
        return productArray[obj.id]
      })
      socket.emit('search/results', items);
    });
  })

  socket.on('session/notification', (obj) => {
    obj.id = helpers.generateUid();
    socket.emit('session/notify', socketManager.sendData('success', obj));
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