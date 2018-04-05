'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');
const helpers = require('../../../server/helpers');

const orderItems = db.define('orderItems', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: helpers.generateUid()
  },
});

module.exports = orderItems;