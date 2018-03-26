'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');
const helpers = require('../../../server/helpers');

const User = db.define('users', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  privilege: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  customerId: {
    type: Sequelize.STRING,
    unique: true
  }
});

module.exports = User;