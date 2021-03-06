'use strict';

const products = require('./products')
const sessions = require('./sessions/index');
const users = require('./users/index');
const logs = require('./logs/index');
const payment = require('./payment');
const config = require('./config');

sessions.Session.belongsTo(users.User);
sessions.sessionSearch.belongsTo(users.User);
logs.userEvent.belongsTo(users.User);
logs.userEvent.belongsTo(sessions.Session);
users.Cart.belongsTo(sessions.Session, { foreignKey: { allowNull: false } });
users.Cart.belongsTo(products.Product, { foreignKey: { allowNull: false } });
payment.paymentSource.belongsTo(users.userAddress, { as: 'billing', foreignKey: { allowNull: false } });
payment.paymentSource.belongsTo(users.User, { foreignKey: { allowNull: false } });
payment.order.belongsTo(users.User, { foreignKey: { allowNull: false } });
payment.order.belongsTo(users.userAddress, { as: 'shipping', foreignKey: { allowNull: false } });
payment.orderItems.belongsTo(users.User, { foreignKey: { allowNull: false } });
payment.orderItems.belongsTo(products.Product, { foreignKey: { allowNull: false } });

module.exports = { products, payment, sessions, users, logs, config };