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
 const appAdmin = express();
 const appClient = express();
 const appVendor = express();
 const models = require('../db/models/index');
 const passport = require('passport');
 const authHelpers = require('./auth/auth-helpers');
 const server = require('http').createServer(app);
 const slogger = require('slogged')
 const moment = require('moment');
 const appManager = require('./managers/appManager');
 const sessionManager = require('./managers/sessionManager');
 const authManager = require('./managers/authManager');
 const socketManager = require('./managers/socketManager');
 const productManager = require('./managers/productManager');
 const cartManager = require('./managers/cartManager');
 const collectionManager = require('./managers/collectionManager');
 const paymentManager = require('./managers/paymentManager');
 const searchManager = require('./managers/searchManager');
 const helpers = require('./helpers');
 const stripe = require('stripe')('pk_test_6NW0ufnPuIGneWb88nmNDvqR');
 const Sifter = require('sifter');
 const useragent = require('useragent');
 const subdomain = require('express-subdomain');
 const util = require('util');
 if (process.env.NODE_ENV !== 'production') require('dotenv').config()

 const port = process.env.PORT || process.env.localport || 8000;


 const io = require('socket.io')(server);
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

 let logConfig = () => {
   let minimal = false;
   if (process.env['LOG_MINIMAL'].length) {
     minimal = process.env['LOG_MINIMAL'] === 'true';
   } else {
     minimal = process.env.NODE_ENV === 'production';
   }
   return minimal;
 }


 io.use(slogger({ minimal: logConfig() }));
 io.engine.generateId = () => {
   return helpers.generateUid(); // custom id must be unique
 }

 let appConfig = {};

 const getAppConfig = async () => {

   let configKeys = Object.keys(appConfig)
   // console.log("Config Keys: ", configKeys);
   // console.log("Config Keys Length: ", configKeys.length);
   if (configKeys.length > 0 && appConfig.timestamp) {
     console.log('config is already defined by something');
     return appConfig;
   } else {
     let data = await appManager.getConfig();
     let rspObj = { version: helpers.generateUid(), timestamp: moment().format(), config: data }
     appConfig = rspObj;
     return rspObj;
   }
 }

 function getClientIp(req) {
   var ipAddress;
   // The request may be forwarded from local web server.
   var forwardedIpsStr = req.header('x-forwarded-for');
   if (forwardedIpsStr) {
     // 'x-forwarded-for' header may return multiple IP addresses in
     // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
     // the first one
     var forwardedIps = forwardedIpsStr.split(',');
     ipAddress = forwardedIps[0];
   }
   if (!ipAddress) {
     // If request was not forwarded
     ipAddress = req.connection.remoteAddress;
   }
   return ipAddress;
 };
 io.on('connection', async (socket) => {
   // setTimeout(async () => socket.emit('config/update', socketManager.sendData('success', await getAppConfig())), 5000);
   // Object.keys(socket.request.headers).map((a) => {
   //   console.log(a, ": ", socket.request.headers[a]);
   // })
   console.log(`Connection Established with ${socket.request.headers['x-forwarded-for']}`);
   console.log('socket.client.conn.remoteAddress', socket.client.conn.remoteAddress);
   console.log('socket.request.connection.remoteAddress', socket.request.connection.remoteAddress);
   console.log('socket.handshake.address', socket.handshake.address);
   socket.emit('config/update', socketManager.sendData('success', await getAppConfig()));
   console.log(socket.handshake.headers['user-agent']);
   socketManager.logIt('item');
   sessionManager.createSession(socket);
   console.log("Socket connected: " + socket.id);
   if (socket.userUid === undefined) {
     socket.emit('user/verify', { request: 'token' });
   };
   socket.on('session/view', (data) => {
     /**
      * @api {get} /session/view Create a view for session
      * @apiName GetUser
      * @apiGroup Session
      *
      * @apiParam {String} Path Path of the session view.
      * @apiParam {String} Type Type of view that is being emitted.
      * @apiParam {Object} Data object.
      */
     sessionManager.createView(socket, {
       path: data.path,
       type: data.type
     });
     let rooms = Object.keys(socket.rooms);
     rooms.map((room) => {
       if (room === '') {

       }
     })
     console.log("previous path: ", socket.currentPath);
     console.log("current path: ", data.path);
     socket.currentPath = data.path;
   });
   socket.on('auth/authenticate', (token) => {

     /**
      * @api {socket} /auth/authenticate Authenticate user token
      * @apiName GetUser
      * @apiGroup User
      * @apiPermission admim
      *
      * @apiParam {String} Path Path of the session view.
      * @apiParam {String} Type Type of view that is being emitted.
      * @apiParam {Object} Data object.
      */
     helpers.verifyToken(token)
       .then((user) => {
         let credentials = { email: user.email, password: user.password }
         authManager.loginUser(credentials, 'auto').then((user) => {
             socket.userUid = user.uid;
             socket.emit('user/login', socketManager.sendData('success', user));
             authManager.logUser('login', 'auto-login', 'server-side', { userUid: user.uid, sessionUid: socket.id })
             sessionManager.bindUser(socket, user.uid);
             socket.join(`user:${user.uid}`)
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
     /**
      * @api {socket} /auth/login Log in User
      * @apiName LoginUser
      * @apiGroup User
      *
      * @apiParam {String} Path Path of the session view.
      * @apiParam {String} Type Type of view that is being emitted.
      * @apiParam {Object} Data object.
      */
     console.log(data);
     authManager.loginUser(data.data)
       .then((data) => {
         socket.emit('user/login', socketManager.sendData('success', data));
         authManager.logUser('login', 'button-click', 'client-side', { userUid: data.uid, sessionUid: socket.id })
         socket.join(`user:${data.uid}`)
         sessionManager.bindUser(socket, data.uid);
       })
       .catch((err) => {
         socket.emit('user/login', socketManager.sendError(err));
       });
   });

   socket.on('auth/logout', (userId) => {
     /**
      * @api {socket} /auth/logout Log out User
      * @apiName LogoutUser
      * @apiGroup User
      *
      * @apiParam {String} Path Path of the session view.
      * @apiParam {String} Type Type of view that is being emitted.
      * @apiParam {Object} Data object.
      */
     authManager.logoutUser(userId);
     authManager.logUser('logout', 'button-click', 'client-side', { userUid: userId, sessionUid: socket.id })
     // io.in(`user:${userId}`).emit('session/notify', socketManager.sendData('success', { message: "test" }));
     socket.userUid = undefined;
     socket.leave(`user:${userId}`)
   });

   socket.on('auth/register', (data) => {
     /**
      * @api {socket} /auth/register Register User
      * @apiName RegisterUser
      * @apiGroup User
      *
      * @apiParam {String} Path Path of the session view.
      * @apiParam {String} Type Type of view that is being emitted.
      * @apiParam {Object} Data object.
      */
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
     searchManager.search(search, socket.id).then((results) => {
       socket.emit('search/results', results);
     });
   })

   socket.on('session/notification', (response) => {
     if (response.type === 'close') {
       sessionManager.closeNotification(response.data.uid)
         .then(data => console.log(data))
         .catch(error => console.log(error))
     } else if (response.type === 'create') {
       sessionManager.createNotification(response.data).then((data) => {
         // console.log(data.dataValues);
         socket.emit('session/notify', socketManager.sendData('success', data.dataValues));
       })
     }
   })
   socket.on('session/:param', (response) => {
     if (response.parameter === 'product') {
       console.log(`session/products:${response.path.split('/')[1]}`);
       // io.in('session/products').emit('session/notify', socketManager.sendData('success', response));
       productManager.getProduct('path', response, socket.userUid).then((data) => {
         socket.join(`products:${data.uid}`);
         let parcel = socketManager.sendData('success', data);
         parcel.renderCode = 200;
         let userClearance = 0;
         if (socket.userUid && data.availability === true) {
           models.users.User.findById(socket.userUid)
             .then((item) => {
               userClearance = item.dataValues.privilege === null ? userClearance : item.dataValues.privilege;
               if (userClearance < data.clearance) {
                 parcel.data.availability = false;
               }
               socket.emit('product/view', parcel);
             }).catch((err) => {
               console.log("error ::: ", err);
               // user was not able to be found via userUid provided from socket.userUid
               // 1. Reset user clearance to 0 (default user clearance)
               // 2.
               console.log('socket.userUid', socket.userUid);
             });
         } else {
           if (userClearance < data.clearance) {
             parcel.data.availability = false;
           }
           socket.emit('product/view', parcel);
         }
       }).catch((error) => {
         let parcel = socketManager.sendError(error);
         parcel.renderCode = 404;
         socket.emit('product/view', parcel);
         console.log("FAILURE!!", error);
       })
     } else if (response.parameter === 'products') {
       productManager.getProducts(response.options, socket.userUid).then((data) => {
         socket.emit('products/view', { type: 'success', data: data })
       });
     } else if (response.parameter === 'collection') {
       collectionManager.getCollection(response.data).then((data) => {
         socket.emit('collection/view', socketManager.sendData('success', data));
       })
     } else if (response.parameter === 'collections') {
       collectionManager.getCollections().then((data) => {
         socket.emit('collections/view', socketManager.sendData('success', data));
       })
     }
   });

   socket.on('cart', (cart) => {
     let rooms = Object.keys(socket.rooms);
     if (cart.action === 'add') {
       console.log("CART:: ", cart);
       cartManager.addToCart(cart.data.product.uid, socket.id).then((a) => {
         console.log('successful adding!');
         cartManager.getCartbyUserId(a.userUid).then((data) => {
           // console.log(data);
           socket.emit('update/cart', socketManager.sendData('success', data));
           socket.to(`user:${a.userUid}`).emit('update/cart', socketManager.sendData('success', data));
         });
       });
     } else if (cart.action === 'remove') {
       console.log(cart);
       cartManager.removeFromCart(cart.data.cart.uid, socket.id).then((response) => {
         console.log(response);
         cartManager.getCartbyUserId(socket.userUid).then((data) => {
           console.log(data);
           socket.emit('update/cart', socketManager.sendData('success', data));
           socket.to(`user:${socket.userUid}`).emit('update/cart', socketManager.sendData('success', data));
         });
       })
     } else if (cart.action === 'get') {
       if (cart.data) {
         if (cart.data.userToken) {
           helpers.verifyToken(cart.data.userToken).then((user) => {
             cartManager.getCartbyUserId(user.uid).then((response) => {
               socket.emit('update/cart', socketManager.sendData('success', response));
             })
           })
         }
       }
     }
   });

   socket.on('checkout', (data) => {
     console.log(data);
     paymentManager.testFeature();
     // paymentManager.checkoutUser(socket.id);
   });

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

 var apiRouter = express.Router();

 //api specific routes
 apiRouter.get('/', function(req, res) {
   res.send('Welcome to our API!');
 });

 apiRouter.get('/users', function(req, res) {
   res.json([
     { name: "Brian" }
   ]);
 });

 app.use(subdomain('admin', express.static(path.resolve(__dirname, '..', 'build'))));


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

 server.listen(port);

 module.exports = app;