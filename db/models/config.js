'use strict'
const Sequelize = require('sequelize');
const db = require('../index.js');
const helpers = require('../../server/helpers');

const config = db.define('config', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: helpers.generateUid()
  },
  method: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  data: {
    type: Sequelize.JSON,
    allowNull: false,
    defaultValue: {}
  },
  clearance: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = config;