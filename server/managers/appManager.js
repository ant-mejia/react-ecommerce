const models = require('../../db/models/index');
const _ = require('lodash');

this.getConfig = () => {
  return new Promise(function(resolve, reject) {
    models.config.findAll().then((data) => {
      let result = {};
      data.map((item) => {
        let d = item.dataValues
        _.set(result, d.method, d.data)
      });
      resolve(result);
    })
  });
  // return { data: 'test data!' };
}

module.exports = this;