const stripe = require('stripe')('sk_test_pt5W3nh0S1VIkw3gREYacV1B');
const models = require('../../db/models/index');
const helpers = require('../helpers');
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

this.createProduct = (obj) => {
  let requiredProps = ['path', 'title', 'summary', 'description', 'category', 'tags', 'price', 'clearance', 'reelaseDate', 'dimensions'];
  productUid = helpers.generateUid();
  stripe.products.create({
    id: productUid,
    name: 'T-shirt',
    type: 'good',
    description: 'Comfortable cotton t-shirt',
    attributes: ['size', 'gender'],
    metadata: { path: '/path', uid: productUid },
    url: 'https://example.com/path'
  }).then((product) => {
    console.log('PRO DUCT: ', product);
  })
}

this.getProduct = (method, data, userId) => {
  return new Promise((resolve, reject) => {
    if (method === 'path') {
      models.products.Product.findOne({ where: { path: data.path } })
        .then((obj) => {
          if (obj !== null && obj.dataValues !== undefined) {
            this.getPromoByProductId(obj.dataValues.uid, userId).then((promo) => {
              console.log("PROMOTION ::: ::: ::: ", promo);
              obj.dataValues.promotion = promo[0];
              obj.dataValues.promoPrice = this.getPromoPrice(obj.dataValues)
              obj.dataValues.price = obj.dataValues.price
              this.getReviews({ productId: obj.dataValues.uid }).then((reviews) => {
                obj.dataValues.reviews = reviews
                resolve(obj.dataValues);
              });
            });
          } else {
            reject(helpers.error('Server', 'Product does not exist', message = 'This product does not exist'))
          }
        })
        .catch((error) => {
          reject(error);
        });
    } else if (method === 'productId') {
      models.products.Product.findById(data.productId)
        .then((obj) => {
          if (obj !== null && obj.dataValues !== undefined) {
            this.getPromoByProductId(obj.dataValues.uid, userId).then((promo) => {
              obj.dataValues.promotion = promo[0];
              obj.dataValues.promoPrice = this.getPromoPrice(obj.dataValues)
              obj.dataValues.price = obj.dataValues.price
              this.getReviews({ productId: obj.dataValues.uid }).then((reviews) => {
                obj.dataValues.reviews = reviews
                resolve(obj.dataValues);
              });
            });
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

this.getPromoPrice = (product) => {
  let promoPrice = product.price
  if (product.promotion) {
    if (product.promotion.promotion.amount) {
      promoPrice = promoPrice - product.promotion.promotion.amount;
    }
    if (product.promotion.promotion.percent) {
      promoPrice = (promoPrice - (promoPrice * (product.promotion.promotion.percent / 100)));
    }
  } else {
    return undefined;
  }
  if (promoPrice === product.price) {
    return undefined;
  } else {
    let dec = promoPrice.toFixed(2);
    let points = dec.toString().split('.')[1];
    let finalPrice = product.price;
    if (points === '00') {
      finalPrice = promoPrice;
    } else {
      finalPrice = dec;
    }
    return finalPrice;
  }
}

this.getPromoByProductId = async (productId, userId) => {
  return new Promise((resolve, reject) => {
    let privilege = 0;
    models.users.User.findById(userId).then((user) => {
      if (user !== null && user.dataValues !== undefined) {
        privilege = user.dataValues.privilege;
      } else {
        // user was not found by id
      }
      models.products.Promo.findAll({
        where: {
          clearance: {
            [Op.lte]: privilege
          },
          active: true,
          startDate: {
            [Op.lt]: moment().toDate()
          },
          endDate: {
            [Op.gt]: moment().toDate()
          }
        }
      }).then((data) => {
        if (data !== null && data !== undefined) {
          let promos = data.map((item) => {
            let obj = {
              uid: item.dataValues.uid,
              title: item.dataValues.title,
              summary: item.dataValues.summary,
              description: item.dataValues.description,
              promotion: item.dataValues.promotion,
              endDate: item.dataValues.endDate
            };
            return obj;
          });
          resolve(promos);
        }
      })
    });
    console.log("privilege ::: ", privilege);
  });;
}

this.getReviews = (obj) => {
  return new Promise(function(resolve, reject) {
    if (obj.productId) {
      models.products.Review.findAll({
        where: { productUid: obj.productId }
      }).then((data) => {
        let reviews = data.map((item) => {
          let values = item.dataValues;
          if (moment(values.createdAt).isSame(values.updatedAt)) {
            values.edited = false;
          } else {
            values.edited = true;
          }
          return values;
        });
        resolve(reviews);
      })
    }
  });;
}

module.exports = this;