'use strict';

const products = require('./products')
const Review = require('./review');
const sessions = require('./sessions/index');
const users = require('./users/index');
const logs = require('./logs/index');

sessions.Session.belongsTo(users.User);
logs.userEvent.belongsTo(users.User);
logs.userEvent.belongsTo(sessions.Session);
users.Cart.belongsTo(sessions.Session, { foreignKey: { allowNull: false } });
users.Cart.belongsTo(products.Product, { foreignKey: { allowNull: false } });

module.exports = { products, Review, sessions, users, logs };