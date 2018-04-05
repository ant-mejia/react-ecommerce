'use strict';

const User = require('./user');
const userProfile = require('./profile');
const Cart = require('./cart');
const Notification = require('./notification');
const userAddress = require('./address');

User.belongsTo(userProfile, { as: 'profile' });
userAddress.belongsTo(User);
Cart.belongsTo(User);
Notification.belongsTo(User);
module.exports = { User, userProfile, Cart, Notification, userAddress };