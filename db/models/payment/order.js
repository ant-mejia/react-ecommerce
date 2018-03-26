'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');
const helpers = require('../../../server/helpers');

const order = db.define('order', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: helpers.generateUid()
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  payment: {
    type: Sequelize.STRING,
    allowNull: false
  },
  trackingId: {
    type: Sequelize.STRING
  },
  customerId: {
    type: Sequelize.STRING,
    unique: true
  },
  metadata: {
    type: Sequelize.JSON
  },
  shippingMethod: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = order;