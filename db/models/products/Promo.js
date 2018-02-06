'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');
const helpers = require('../../../server/helpers');

const Promo = db.define('promo', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    defaultValue: helpers.generateUid(),
    unique: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  summary: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  promotion: {
    type: Sequelize.JSON,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  clearance: {
    type: Sequelize.INTEGER
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = Promo;