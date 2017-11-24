'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');
const helpers = require('../../../server/helpers');

const User = db.define('users', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  privilege: Sequelize.ARRAY(Sequelize.STRING),
}, {
  validate: {
    validEmail() {
      let validity = helpers.validateEmail(this.email, process.env.Blacklist, true);
      if (validity !== true) {
        throw new Error(validity.message)
      }
      return true;
    }
  }
});

module.exports = User;
