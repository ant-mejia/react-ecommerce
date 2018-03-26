const stripe = require('stripe')('sk_test_pt5W3nh0S1VIkw3gREYacV1B');
const models = require('../../db/models/index');
const cardManager = require('./cardManager');
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
}
this.checkoutUser = (socketId) => {
  stripe.charges.create({
    amount: 2000,
    currency: "usd",
    customer: "cus_CPz8cUsESJAN5r",
    source: "src_18eYalAHEMiOZZp1l9ZTjSU0",
    description: "Charge for charlotte.johnson@example.com"
  }).then(data => console.log(data));
}

module.exports = this;