'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');
const helpers = require('../../../server/helpers');

const paymentSource = db.define('paymentSource', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    defaultValue: helpers.generateUid(),
    unique: true
  },
  sourceId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastFour: {
    type: Sequelize.STRING,
    allowNull: false
  },
  expiration: {
    type: Sequelize.STRING,
    allowNull: false
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  availability: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

module.exports = paymentSource;