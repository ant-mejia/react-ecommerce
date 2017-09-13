'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');

const Session = db.define('sessions', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  events: Sequelize.ARRAY(Sequelize.STRING),
  device: {
    type: Sequelize.STRING,
    allowNull: false
  },
  timeStart: {
    type: Sequelize.DATE,
    allowNull: false
  },
  timeEnd: {
    type: Sequelize.DATE
  }
});

module.exports = Session;
