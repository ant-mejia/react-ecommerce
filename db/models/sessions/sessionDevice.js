'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');

const sessionDevice = db.define('sessionDevice', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  type: Sequelize.STRING,
  location: {
    type: Sequelize.STRING
  },
  coordinates: {
    type: Sequelize.STRING
  },
  operatingSystem: {
    type: Sequelize.STRING,
    allowNull: false
  },
  uaString: {
    type: Sequelize.STRING,
    allowNull: false
  },
  browser: {
    type: Sequelize.STRING,
    allowNull: false
  },
  display: {
    type: Sequelize.STRING,
    allowNull: false
  },
  publicIP: {
    type: Sequelize.STRING,
    allowNull: false
  },
  serviceProvider: {
    type: Sequelize.STRING,
    allowNull: false
  }

});

module.exports = sessionDevice;
