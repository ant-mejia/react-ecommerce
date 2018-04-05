const stripe = require('stripe')('sk_test_pt5W3nh0S1VIkw3gREYacV1B');
const _ = require('lodash');
const models = require('../../db/models/index');
const helpers = require('../helpers');
const cardManager = require('./cardManager');
const cartManager = require('./cartManager');
const productManager = require('./productManager');
const orderManager = require('./orderManager');

this.createCustomer = (userId) => {
  return new Promise(function(resolve, reject) {
    if (userId !== undefined) {
      models.users.User.findById(userId).then((account) => {
        let user = account.dataValues;
        stripe.customers.create({
          email: user.email,
          metadata: {
            userUid: user.uid
          }
        }).then((customer) => {
          if (customer !== null) {
            console.log("Customer! :: ", customer);
            resolve(customer)
          }
        })
      })
    }
  });
}
this.testFeature = () => {
  let testCards = [{
    number: '378282246310005',
    expiration: '12/22',
    cvc: 219,
    billing: {
      addressLine1: "219 E 19th Street",
      addressLine2: "Apt. 3A",
      city: "New York",
      state: "New York",
      zipCode: 10016,
      country: "United States",
      uid: 'faip933nsajad'
    }
  }, {
    number: '4242424242424241',
    expiration: '10/31',
    cvc: 101
  }];
  testCards.map((card) => {
    console.log(`Card Number: ${card.number} -- Valid: ${cardManager.validateCard(card) ? 'TRUE' : 'FALSE'}`);
  });
  cardManager.createCard('7c62e852-6355-4550-8a49-0c78efab44fe', testCards[0]);
  this.checkoutUser('7c62e852-6355-4550-8a49-0c78efab44fe', 'aaaabaosdu');
}
this.checkoutUser = (userId, sourceId, shippingObj) => {
  let that = {};
  that.itemizeCartTotal = (cart) => {
    let finalAmount = 0;
    console.log('AIID', cart);
    cart.map((item) => {
      let product = item.product;
      let price = product.price;
      if (product.promoPrice) {
        price = product.promoPrice
      }
      finalAmount += price;
    });
    return finalAmount;
  }

  that.orderSuccessful = (order) => {
    return true;
  }
  return new Promise(async (resolve, reject) => {
    let cartItems;
    let cartResponse = await cartManager.getCartbyUserId(userId);
    if (_.isEmpty(cartResponse)) {
      reject('no items in cart');
      return;
    } else {
      cartItems = cartResponse;
    }
    let userData = await models.users.User.findById(userId);
    let user = userData.dataValues;
    let source = await cardManager.getCardById(sourceId);
    let orderId = helpers.generateUid();
    console.log('CURRENT USER ::: ', user);
    console.log('SOURCE CARD ::: ', source);
    let chargeAmount = that.itemizeCartTotal(cartItems);
    console.log('Amount Charged: ', chargeAmount);
    stripe.orders.create({
      currency: 'usd',
      items: [{
        type: 'sku',
        parent: 'b3rLvVd8SpO1aCkSxJrR20eHiPfAKM'
      }],
      shipping: {
        name: 'Isabella Taylor',
        address: {
          line1: '1234 Main Street',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
          postal_code: '94111'
        }
      },
      email: 'isabella.taylor@example.com'
    });
    stripe.charges.create({
      amount: chargeAmount,
      currency: "usd",
      customer: user.customerId,
      source: source.sourceId,
      description: "Charge for charlotte.johnson@example.com"
    }).then((order) => {
      console.log(order);
      if (that.orderSuccessful(order)) {
        orderManager.createOrder(order);
      }
    });
  });
}

module.exports = this;