'use strict';

const products = require('./products')
const Review = require('./review');
const sessions = require('./sessions/index');
const users = require('./users/index');
const logs = require('./logs/index');
const product = require('./product');

sessions.Session.belongsTo(users.User);
logs.userEvent.belongsTo(users.User);
logs.userEvent.belongsTo(sessions.Session);

module.exports = { product, products, Review, sessions, users, logs };