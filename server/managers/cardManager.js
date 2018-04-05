const stripe = require('stripe')('sk_test_pt5W3nh0S1VIkw3gREYacV1B');
const moment = require('moment');
const models = require('../../db/models/index');
const helpers = require('../helpers');
const convertAddress = (obj = {}) => {
  return obj;
  let keys = Object.keys(obj);
  let requiredProps = ['buildingNumber', 'streetName', 'city', 'state', 'zipCode', 'userUid'] // keys.map()
}

const billingRetriver = (bill) => {
  return new Promise((resolve, reject) => {
    if (typeof bill === 'string') {
      models.users.userAddress.findById(bill).then((data) => {
        resolve(data.dataValues);
      });
    }
  });
}

this.validateCard = (card) => {
  let that = {};
  const validate = () => {
    let keys = Object.keys(that);
    let validity = true;
    keys.map((item) => {
      let method = that[item];
      if (method() !== true) {
        validity = false
      }
    })
    return validity;
  }

  that.propsPassed = () => {
    const requiredProps = ['number', 'cvc', 'expiration', 'billing'];
    if (typeof card === 'object' && card instanceof Object) {
      let passProps = true;
      requiredProps.map((prop) => {
        if (!card.hasOwnProperty(prop) || (card[prop] === '' || card[prop] === null)) {
          passProps = false;
        }
      });
      return passProps;
    } else {
      return false;
    }
  }

  that.expirationPassed = () => {
    // example: 01/23
    if (that.propsPassed()) {
      let expiration = card.expiration
      let isString = typeof expiration === 'string' && expiration !== null && expiration !== '';
      let hasSlash = expiration.indexOf("/") >= 0;
      let expRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/mg;
      if (isString && hasSlash && expRegex.test(expiration)) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }

  that.numberLuhnPassed = () => {
    const cardNumber = card.number;
    let trimmed = String(cardNumber).replace(/[\s]/g, ""),
      length = trimmed.length,
      odd = false,
      total = 0,
      calc, calc2;
    if (length === 0) {
      return true;
    }
    if (!/^[0-9]+$/.test(trimmed)) {
      return false;
    }
    for (var i = length; i > 0; i--) {
      calc = parseInt(trimmed.charAt(i - 1));
      if (!odd) {
        total += calc;
      } else {
        calc2 = calc * 2;
        switch (calc2) {
          case 10:
            calc2 = 1;
            break;
          case 12:
            calc2 = 3;
            break;
          case 14:
            calc2 = 5;
            break;
          case 16:
            calc2 = 7;
            break;
          case 18:
            calc2 = 9;
            break;
          default:
            calc2 = calc2;
        }
        total += calc2;
      }
      odd = !odd;
    }
    return ((total % 10) === 0);
  }

  // that.numberLuhnPassed = () => {
  //   let cardNumber = card.number;
  //   // accept only digits, dashes or spaces
  //   if (/[^0-9-\s]+/.test(cardNumber)) return false;
  //   let a = 0,
  //     b = 0,
  //     c = false;
  //   cardNumber = cardNumber.replace(/\D/g, "");
  //   cardNumber.split('').map((n) => {
  //     let d = cardNumber.charAt(n),
  //       b = parseInt(d, 10);
  //     if (c) {
  //       if ((b *= 2) > 9) b -= 9;
  //     }
  //     a += b;
  //     c = !c;
  //   });
  //   return (a % 10) === 0;
  // }

  that.billingPropsPassed = () => {
    const requiredProps = ['addressLine1', 'city', 'state', 'zipCode'];
    if (typeof card.billing === 'object' && card.billing instanceof Object) {
      let passProps = true;
      requiredProps.map((prop) => {
        if (!card.billing.hasOwnProperty(prop) || (card.billing[prop] === '' || card.billing[prop] === null)) {
          passProps = false;
        }
      });
      return passProps;
    } else {
      return false;
    }
  }
  return validate();
}

this.createCard = (userId, card = {}) => {
  return new Promise(async (resolve, reject) => {
    let cardValid = this.validateCard(card);
    if (cardValid) {
      let profileInstance = await models.users.userProfile.findOne({ where: { userUid: userId }, include: [models.users.User] });
      let billingInstance = await billingRetriver(card.billing.uid);
      let user = profileInstance.user.dataValues;
      let customerId = user.customerId;
      let expiration = { month: card.expiration.split('/')[0], year: card.expiration.split('/')[1] }
      let paymentSourceUid = helpers.generateUid();
      console.log(user, customerId, expiration, billingInstance);
      let source = {
        object: 'card',
        address_city: billingInstance.city,
        address_country: billingInstance.country,
        address_line1: billingInstance.primaryLine,
        address_line2: billingInstance.secondaryLine,
        address_state: billingInstance.state,
        address_zip: billingInstance.zipCode,
        exp_month: expiration.month,
        exp_year: expiration.year,
        number: card.number,
        cvc: card.cvc,
        metadata: {
          paymentUid: paymentSourceUid
        }
      };
      if (customerId) {
        stripe.customers.createSource(customerId, { source }).then((cardResponse) => {
          console.log('STRIPE RESPONSE :: ', cardResponse);
          if (cardResponse.id) {
            models.payment.paymentSource.create({
              uid: paymentSourceUid,
              sourceId: cardResponse.id,
              lastFour: cardResponse.last4,
              expiration: `${cardResponse.exp_month}/${cardResponse.exp_year}`,
              brand: cardResponse.brand,
              billingUid: billingInstance.uid,
              userUid: userId,
              availability: true
            }).then((data) => {
              console.log(data.dataValues);
            })
          }
        })
      }
    }
  });
}

this.getCardById = (sourceId) => {
  return new Promise(async (resolve, reject) => {
    let cardData = await models.payment.paymentSource.findById(sourceId);
    if (cardData === null) {
      reject('card not found');
      return;
    } else {
      resolve(cardData.dataValues);
    }
  });
}

this.getWallet = (userId) => {
  return new Promise(function(resolve, reject) {

  });
}

module.exports = this;