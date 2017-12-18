'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');
const helpers = require('../../../server/helpers');

const Product = db.define('products', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    defaultValue: helpers.generateUid(30, true),
    unique: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: Sequelize.ARRAY(Sequelize.STRING),
  current_price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  availability: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  presentationLevel: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  images: {
    type: Sequelize.JSON
  }
});

module.exports = Product;