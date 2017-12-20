const models = require('../../db/models/index');
const helpers = require('../helpers');
const moment = require('moment');

this.viewProduct = (method, data) => {
  return new Promise(function(resolve, reject) {
    if (method === 'path') {
      // models.products.Product.findOne({ where: { path: data.path } })
    }
  });
}

module.exports = this;