'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');
const helpers = require('../../../server/helpers');

const userAddress = db.define('userAddress', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    defaultValue: helpers.generateUid(),
    unique: true
  },
  buildingNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  streetName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  primaryLine: {
    type: Sequelize.STRING,
    allowNull: false
  },
  secondaryLine: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    defaultValue: 'United States',
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
module.exports = userAddress;
