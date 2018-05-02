const models = require('../../db/models/index');
const helpers = require('../helpers');
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

this.getCollections = () => {
  return new Promise((resolve, reject) => {
    models.products.Collection.findAll({
      where: {
        availability: true,
        releaseDate: {
          [Op.lt]: moment().toDate()
        },
        endDate: {
          [Op.gt]: moment().toDate()
        },
      },
      order: [
        ['releaseDate', 'DESC']
      ],
      include: [{ model: models.products.Product, required: true, }]
    }).then((response) => {
      resolve(response);
    });
  });
};

this.getCollection = (obj) => {
  return new Promise((resolve, reject) => {
    if (obj.path) {
      console.log('object path: ', obj);
      models.products.Collection.findOne({
        where: {
          path: obj.path,
          availability: true,
          releaseDate: {
            [Op.lt]: moment().toDate()
          },
          endDate: {
            [Op.gt]: moment().toDate()
          },
        },
        include: [{ model: models.products.Product, required: true, include: [{ model: models.products.Promo, required: false }] }]
      }).then((response) => {
        resolve(response);
      });
    }
  });
};

module.exports = this;