'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');

const sessionSearch = db.define('sessionSearch', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  query: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = sessionSearch;
