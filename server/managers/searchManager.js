/* @flow */
const Sifter = require('sifter');
const stripHtml = require('string-strip-html');
const models = require('../../db/models/index');
const helpers = require('../helpers');
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

this.addSearchHistory = (search) => {}

this.search = (search = {}, sessionId = '') => {
  let siftArray = [];
  const addToSift = (arr = [], type) => {
    let flour = arr.map((item) => {
      if (item.type === undefined) {
        item.type = type;
      }
      return item;
    })
    let oldSift = siftArray;
    let newSift = [].concat(oldSift, flour)
    siftArray = newSift;
    console.log(siftArray);
  }
  return new Promise(async (resolve, reject) => {
    if (search.query === undefined) {
      reject('no search query provided')
      return;
    }

    let options = {};
    let content = {};

    // import product
    let products = await models.products.Product.findAll(options);
    if (products === null) {
      products = [];
    }
    products = products.map((p) => {
      let product = p.dataValues;
      let productkeys = Object.keys(product);
      productkeys.map((pkey) => {
        if (typeof product[pkey] === 'string') {
          product[pkey] = stripHtml(product[pkey])
        }
      });
      return product;
    });
    content['product'] = products;

    // import collection
    let collections = await models.products.Collection.findAll(options);
    if (collections === null) {
      collections = [];
    }
    collections = collections.map((c) => {
      let collection = c.dataValues;
      let collectionKeys = Object.keys(collection);
      collectionKeys.map((pkey) => {
        if (typeof collection[pkey] === 'string') {
          collection[pkey] = stripHtml(collection[pkey])
        }
      })
      return collection;
    });

    content['collection'] = collections;
    for (let contentType in content) {
      let arr = content[contentType];
      addToSift(arr, contentType);
    }
    const sifter = new Sifter(siftArray);
    var result = sifter.search(search.query, {
      conjunction: "and",
      fields: [
        'title', 'description',
      ],
      sort: [{
        field: 'title',
        direction: 'asc',
      }],
    });
    let items = result.items.map((obj) => {
      let data = siftArray[obj.id];
      let rsp = {
        type: data.type,
        data,
      }
      return rsp;
    });
    resolve(items)
  });
}

module.exports = this;