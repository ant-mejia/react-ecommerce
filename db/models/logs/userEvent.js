'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');

const userEvent = db.define('userEvent', {
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
  method: {
    type: Sequelize.STRING,
    allowNull: false
  },
  eventType: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = userEvent;