'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');

const Cart = db.define('cart', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false
  },
  addedAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  removedAt: {
    type: Sequelize.DATE,
    allowNull: true
  }

});

module.exports = Cart;