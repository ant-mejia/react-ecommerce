const sessionManager = require('./sessionManager');
const helpers = require('../helpers');
const models = require('../../db/models');
const moment = require('moment');

this.isProductAvailable = async (userId, productId) => {
  console.log('boo');
  let user = await models.users.User.findById(userId);
  let product = await models.products.Product.findById(productId);
  if (user.dataValues && product.dataValues) {
    let conditions = {
      released: moment(product.dataValues.releaseDate).isBefore(moment()),
      available: product.dataValues.availability === true,
      clearanceAvailable: user.dataValues.privilege > product.dataValues.clearance
    }
    let conditionKeys = Object.keys(conditions);
    console.log(conditionKeys);
    let conditionalArray = conditionKeys.filter((item) => {
      return typeof conditions[item] === 'boolean' && conditions[item] === false;
    })
    if (conditionalArray.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}

this.addToCart = (productId, socketId) => {
  return new Promise((resolve, reject) => {
    if (socketId) {
      sessionManager.getSession(socketId)
        .then((session) => {
          if (!session.dataValues) {
            reject('error')
          }
          let userId = session.dataValues.userUid;
          if (userId) {
            this.isProductAvailable(userId, productId).then((response) => {
              console.log("RESPONSE :: ", response);
              if (response === true) {
                models.users.Cart.create({
                  uid: helpers.generateUid(),
                  addedAt: moment().format(),
                  productUid: productId,
                  sessionUid: session.uid,
                  userUid: userId
                }).then((data) => {
                  resolve(data.dataValues);
                })
              }
            });
          }
        })
        .catch((b) => {
          reject(b);
        })
    }
  });
}

this.removeFromCart = (cartId, socketId) => {
  return new Promise((resolve, reject) => {
    models.users.Cart.update({
      removedAt: moment()
    }, {
      where: {
        uid: cartId
      }
    }).then((item) => {
      resolve(item)
    })
  });
}

this.getCartbyUserId = (userId) => {
  return new Promise(function(resolve, reject) {
    // make sure that the userId is currently valid.
    if (userId === undefined || userId === '' || userId === null) {
      reject('terrible error!')
    }
    models.users.User.findById(userId).then((user) => {
      if (user.dataValues === undefined) {
        reject('terrible error!')
      }
      models.users.Cart.findAll({
        where: { userUid: userId, removedAt: null },
        order: [
          ['addedAt', 'DESC']
        ],
        include: [{ model: models.products.Product, required: true }]
      }).then((cart) => {
        resolve(cart);
      })
    })
    // find all items in cart directory that have a userUid of the paramter above
    // make sure to include the product key in the search.
    // return the dataValues provided
  });
}

module.exports = this;