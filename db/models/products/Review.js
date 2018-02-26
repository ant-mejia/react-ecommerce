'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');
const helpers = require('../../../server/helpers');

const Review = db.define('productReview', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    defaultValue: helpers.generateUid(),
    unique: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 5,
    validate: {
      notEmpty: true,
      isNumeric: true,
      max: 5,
      min: 1,
    }
  },
});

module.exports = Review;