'use strict';

const Product = require('./product')
const Review = require('./review');
const Sessions = require('./sessions/index');
const Users = require('./users/index');

Sessions.Session.belongsTo(Users.User);


module.exports = { Product, Review, Sessions, Users };
