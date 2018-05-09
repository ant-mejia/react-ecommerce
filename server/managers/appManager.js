const models = require('../../db/models/index');
const collectionManager = require('./collectionManager');
const _ = require('lodash');

this.getConfig = () => {
  return new Promise((resolve, reject) => {
    models.config.findAll().then((data) => {
      let result = {};
      data.map((item) => {
        let d = item.dataValues
        _.set(result, d.method, d.data)
      });
      if (result.index && result.index.featuredCollections) {
        let collectionIds = _.values(result.index.featuredCollections);
        let collections = collectionIds.map((colId) => {
          return collectionManager.getCollection({ uid: colId }).then((colData) => {
            return colData.dataValues;
          })
        });
        Promise.all(collections).then((cols) => {
          result.index.featuredCollections = cols;
          resolve(result);
        })

      } else {
        resolve(result);
      }
    })
  });
  // return { data: 'test data!' };
}

module.exports = this;