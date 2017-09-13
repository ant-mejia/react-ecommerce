'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');

const sessionEvent = db.define('sessionEvent', {
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
  target: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  timeStamp: {
    type: Sequelize.DATE,
    allowNull: false
  }

});

module.exports = sessionEvent;
