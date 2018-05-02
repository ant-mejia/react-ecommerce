'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');
const helpers = require('../../../server/helpers');

const Collection = db.define('collection', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    defaultValue: helpers.generateUid(),
    unique: true,
  },
  path: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^\/(([A-z0-9\-])+$)/
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tagline: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  summary: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  availability: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  clearance: {
    type: Sequelize.INTEGER
  },
  releaseDate: {
    type: Sequelize.DATE
  },
  endDate: {
    type: Sequelize.DATE
  },
  metadata: {
    type: Sequelize.JSON
  },
  style: {
    type: Sequelize.JSON,
    defaultValue: null,
  },
});
module.exports = Collection;
