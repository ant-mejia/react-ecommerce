const models = require('../../db/models/index');
const helpers = require('../helpers');
const moment = require('moment');

this.getProduct = (method, data) => {
  return new Promise(function(resolve, reject) {
    if (method === 'path') {
      models.products.Product.findOne({ where: { path: data.path } })
        .then((obj) => {
          if (obj !== null && obj.dataValues !== undefined) {
            resolve(obj.dataValues);
          } else {
            reject(helpers.error('Server', 'Product does not exist', message = 'This product does not exist'))
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

module.exports = this;