'use strict';

const Product = require('./product')
const Review = require('./review');
const sessions = require('./sessions/index');
const users = require('./users/index');
const logs = require('./logs/index');

sessions.Session.belongsTo(users.User);


module.exports = { Product, Review, sessions, users, logs };
