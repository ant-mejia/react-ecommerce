'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');
const moment = require('moment');
const Cart = db.define('cart', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  addedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  removedAt: {
    type: Sequelize.DATE,
    allowNull: true
  }
});

module.exports = Cart;