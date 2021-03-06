'use strict'

const Sequelize = require('sequelize');
const db = require('../../index.js');
const helpers = require('../../../server/helpers');

const Product = db.define('products', {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    defaultValue: helpers.generateUid(),
    unique: true
  },
  path: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^\/(([A-z0-9\-])+$)/
    }
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
  category: Sequelize.ARRAY(Sequelize.STRING),
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  availability: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  clearance: {
    type: Sequelize.INTEGER
  },
  releaseDate: {
    type: Sequelize.DATE
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
}, {
  defaultScope: {
    where: {
      availability: true
    }
  }
});

module.exports = Product;