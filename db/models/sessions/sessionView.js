'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');

const sessionView = db.define('sessionView', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  path: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  timeStamp: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = sessionView;
