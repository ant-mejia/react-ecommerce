const models = require('../../db/models/index');
const paymentManager = require('./paymentManager');
const helpers = require('../helpers');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('../auth/local');
const Sifter = require('sifter');

let validUserObj = (obj) => {
  // console.log(obj);
  let returnValue = true;
  return returnValue;
}

this.getUser = (obj) => {
  console.log('getting user profile..');
  return new Promise(function(resolve, reject) {
    if (typeof obj === 'object') {
      models.users.userProfile.findOne({
        where: obj
      }).then((profile) => {
        console.log("ADDRESS DATA LOADING>>>");
        if (profile !== null && profile.hasOwnProperty('dataValues')) {
          let profileData = profile.dataValues;
          models.users.userAddress.findAll({
            where: {
              userUid: profile.userUid
            }
          }).then((addressData) => {
            if (addressData !== null) {
              let addresses = addressData.map(item => item.dataValues);
              profileData.address = addresses;
            }
            resolve(profileData)
          })
        } else {
          return reject(helpers.error('Authentication', "Invalid Email", "The email address provided is invalid"));
        }
      });
    }
  });
}


this.loginUser = (cred, method = 'email') => {
  return new Promise(async (resolve, reject) => {
    if (method === 'email') {
      models.users.User.findOne({
        where: {
          email: cred.email
        },
        include: [{ model: models.users.userProfile, as: 'profile' }]
      }).then((user) => {
        // console.log('Password Verification: ::: ', helpers.comparePass(cred.password, user.password));
        console.log("USER: ", user);
        if (user === null) {
          return reject(helpers.error('Authentication', "Invalid Email", "The email address provided is invalid"));
        }
        if (validUserObj(user.dataValues) && cred.email === user.dataValues.email) {
          user = user.dataValues;
          if (this.comparePass(cred.password, user.password)) {
            console.log('line 60: executed');
            let token = helpers.generateToken(user);
            user['token'] = token;
            resolve(user);
          } else {
            return reject(helpers.error('Authentication', "Invalid Password", "The password provided is invalid"));
          }
        } else {
          return reject(helpers.error('Authentication', "Invalid Email", "The email address provided is invalid"));
        }
      });
    } else if (method === 'auto') {
      models.users.User.findOne({
        where: {
          email: cred.email
        },
        include: [{ model: models.users.userProfile, as: 'profile' }]
      }).then(async (user) => {
        // console.log('Password Verification: ::: ', helpers.comparePass(cred.password, user.password));
        if (validUserObj(user) && user !== undefined && user !== null) {
          user = user.dataValues;
          if (cred.password === user.password) {
            let addressData = await this.getUserAddress(user.uid);
            if (user.address === undefined) {
              user.address = addressData;
            }
            let token = helpers.generateToken(user);
            user['token'] = token;
            resolve(user);
          } else {
            return reject(helpers.error('Authentication', "Invalid Password", "The password provided is invalid"));
          }
        } else {
          return reject(helpers.error('Authentication', "Invalid Email", "The email address provided is invalid"));
        }
      });
    } else {
      resolve({ data: "Stuff worked!" });
    }
  });
}

this.getUserAddress = (userId) => {
  return new Promise(function(resolve, reject) {
    if (userId === null || userId === undefined || typeof userId !== 'string') {
      reject('no user');
      return;
    }
    models.users.userAddress.findAll({ where: { userUid: userId } }).then((data) => {
      let addressArr = data.map(addr => addr.dataValues);
      resolve(addressArr);
    })
  });
}

this.logoutUser = (id) => {
  console.log(id);
}

this.logUser = (type, method, eventType, obj) => {
  return new Promise(function(resolve, reject) {
    models.logs.userEvent.create({
      uid: helpers.generateUid(),
      type,
      method,
      eventType,
      userUid: obj.userUid,
      sessionUid: obj.sessionUid
    }).then((log) => {
      resolve(log);
    }).catch((err) => {
      reject(helpers.error());
    })
  });
}
this.createUser = (user) => {
  return new Promise(function(resolve, reject) {
    models.users.User.create({
      uid: helpers.generateUid(30, true),
      email: user.email,
      password: helpers.hashPass(user.password)
    }).then((account) => {
      userData = account.dataValues;
      models.users.userProfile.create({
        uid: helpers.generateUid(),
        firstName: user.firstName,
        lastName: user.lastName,
        userUid: userData.uid
      }).then((profile) => {
        userData.profile = profile.dataValues;
        let token = helpers.generateToken(userData);
        userData.token = token;
        if (user.accountType === undefined || user.accountType === 'customer') {
          paymentManager.createCustomer(userData.uid).then((customer) => {
            models.users.User.update({ customerId: customer.id }, { where: { uid: userData.uid } }).then((rsp) => {
              console.log("RSPAA <<<>>> ", rsp);
              userData.customerId = customer.id
              resolve(userData);
            })
          })
        }
        resolve(userData);
      }).catch((err) => {
        // Reject error
        reject(err);
      });
    }).catch((err) => {
      // Reject error
      reject(err);
    });
  });
}


this.comparePass = (userPassword, databasePassword) => {
  return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = this;
