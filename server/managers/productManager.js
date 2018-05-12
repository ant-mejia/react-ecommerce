const stripe = require('stripe')('sk_test_pt5W3nh0S1VIkw3gREYacV1B');
const _ = require('lodash');
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
  return new Promise(async (resolve, reject) => {
    let userClearance = 0;
    if (userId !== undefined && typeof userId === 'string') {
      let userData = await models.users.User.findById(userId);
      if (userData !== null && userData.dataValues !== undefined) {
        let user = userData.dataValues;
        userClearance = user.privilege;
      }
    }
    if (method === 'path') {
      models.products.Product.findOne({
          where: { path: data.path },
          include: [{
            model: models.products.Promo,
            required: false,
            where: {
              clearance: {
                [Op.lte]: userClearance
              },
              startDate: {
                [Op.lt]: moment().toDate()
              },
              endDate: {
                [Op.gt]: moment().toDate()
              },
              active: true
            }
          }, {
            model: models.products.Review,
            as: 'productReviews',
            required: false
          }]
        })
        .then((obj) => {
          if (obj !== null && obj.dataValues !== undefined) {
            let product = obj.dataValues;
            product.promoPrice = this.getPrice(product);
            resolve(product);
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

this.getProducts = (options, userUid) => {
  console.log("OPTIONS ::: ", options);
  return new Promise(async (resolve, reject) => {
    let user = undefined;
    if (userUid) {
      let userData = await models.users.User.findById(userUid);
      if (userData !== null && userData.dataValues) {
        user = userData.dataValues;
      }
    }
    let userClearance = 0;
    if (user !== undefined && user !== null) {
      userClearance = user.privilege;
    }
    models.products.Product.findAll({
      where: {
        availability: true,
        clearance: {
          [Op.lte]: userClearance
        },
        releaseDate: {
          [Op.lt]: moment().toDate()
        }
      },
      include: [{
        model: models.products.Promo,
        required: false,
        where: {
          clearance: {
            [Op.lte]: userClearance
          },
          startDate: {
            [Op.lt]: moment().toDate()
          },
          endDate: {
            [Op.gt]: moment().toDate()
          },
          active: true
        }
      }]
    }).then((productData) => {
      if (productData === null || productData === undefined) {
        reject('no products');
      }
      let products = productData.map((a) => {
        let b = a.dataValues
        b.image = { src: 'https://revolutioncdn-themepunchgbr.netdna-ssl.com/wp-content/uploads/revslider/beforeafteraddon/object_coffee_1.png' };
        b.promoPrice = this.getPrice(b);
        return b;
      });
      let sortedProducts = products;
      if (options.sort) {
        let sort = options.sort.toLowerCase();
        if (sort === 'default') {
          sortedProducts = products;
        } else if (sort === 'newest') {
          sortedProducts = _.sortBy(products, [(p) => moment().diff(moment(p.releaseDate))])
        } else if (sort === 'lowest price') {
          sortedProducts = _.sortBy(products, [(p) => p.promoPrice || p.price]);
        } else if (sort === 'highest price') {
          sortedProducts = _.reverse(_.sortBy(products, [(p) => p.promoPrice || p.price]));
        }
      }
      // console.log("Sorted Products: ", sortedProducts.map(a => `path: ${a.path} price: ${a.promoPrice || a.price}`));
      if (options.filter) {
        let filteredProducts = sortedProducts.filter((product) => {
          let onPromo = true;
          let priceMatch = true;
          if (options.filter.onPromotion) {
            onPromo = product.promoPrice !== undefined;
          }
          if (options.filter.price) {
            let productPrice = Math.ceil(product.promoPrice || product.price);
            priceMatch = (productPrice >= options.filter.price.min) && (productPrice <= options.filter.price.max);
          }
          return onPromo && priceMatch;
        })
        resolve(filteredProducts)
      }
      resolve(sortedProducts);
    })
  });
}
this.getPrice = (product) => {
  if (typeof product === 'string') {
    return undefined
  }
  let promoPrice = product.price;
  if (product.promos) {
    product.promos.map((promo) => {
      if (promo.promotion.amount) {
        promoPrice = promoPrice - promo.promotion.amount;
      }
      if (promo.promotion.percent) {
        promoPrice = (promoPrice - (promoPrice * (promo.promotion.percent / 100)));
      }
    })
  } else {
    return undefined;
  }
  if (promoPrice === product.price) {
    return undefined;
  } else {
    return promoPrice;
  }
}
this.getPromoPrice = (product) => {
  return undefined;
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
  });
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