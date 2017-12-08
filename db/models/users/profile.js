'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');
const helpers = require('../../../server/helpers');

const userProfile = db.define('userProfile', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    defaultValue: helpers.generateUid(),
    unique: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  privilege: Sequelize.ARRAY(Sequelize.STRING),
});
module.exports = userProfile;