'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');

const userLog = db.define('logUser', {
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
  event: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = userLog;
