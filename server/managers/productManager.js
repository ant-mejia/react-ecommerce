const models = require('../../db/models/index');
const helpers = require('../helpers');
const moment = require('moment');

this.getProduct = (method, data, userId) => {
  return new Promise((resolve, reject) => {
    if (method === 'path') {
      models.products.Product.findOne({ where: { path: data.path } })
        .then((obj) => {
          if (obj !== null && obj.dataValues !== undefined) {
            this.getPromoByProductId(obj.dataValues.uid, userId).then((promo) => {
              console.log("PROMOTION ::: ::: ::: ", promo);
              obj.dataValues.promotion = promo[0];
              obj.dataValues.promoPrice = `$${this.getPromoPrice(obj.dataValues)}`
              obj.dataValues.price = `$${obj.dataValues.price}`
              resolve(obj.dataValues);
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
  console.log(product);
  if (product.promotion) {
    if (product.promotion.promotion.amount) {
      promoPrice = promoPrice - product.promotion.promotion.amount;
    }
    if (product.promotion.promotion.percent) {
      promoPrice = (promoPrice - (promoPrice * (product.promotion.promotion.percent / 100)));
      console.log("PROMO ::: ", promoPrice);
    }
  } else {
    return undefined;
  }
  if (promoPrice === product.price) {
    return undefined;
  } else {

    let dec = promoPrice.toFixed(2);
    let points = dec.toString().split('.')[1];
    if (points === '00') {
      return promoPrice;
    } else {
      return dec;
    }
    console.log(points);
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
      console.log(privilege);
      models.products.Promo.findAll({
        where: {
          clearance: {
            $lt: privilege
          },
          active: true,
          startDate: {
            $lt: moment().toDate()
          },
          endDate: {
            $gt: moment().toDate()
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

module.exports = this;