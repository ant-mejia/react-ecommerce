const models = require('../../db/models/index');
const helpers = require('../helpers');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('../auth/local');
const Sifter = require('sifter');
let validUserObj = (obj) => {
  let options = {
    notNull: obj !== null
  };
  for (var prop in options) {
    if (options[prop] === false) {
      return false;
    }
  }
  return true;
}

this.loginUser = (cred, method = 'email') => {
  return new Promise((resolve, reject) => {
    if (method === 'email') {
      models.users.User.findOne({
        where: {
          email: cred.email
        }
      }).then((user) => {
        // console.log('Password Verification: ::: ', helpers.comparePass(cred.password, user.password));
        if (validUserObj(user)) {
          user = user.dataValues;
          if (this.comparePass(cred.password, user.password)) {
            models.users.userProfile.findOne({
              where: {
                userUid: user.uid
              }
            }).then((profile) => {
              if (profile !== null && profile.hasOwnProperty('dataValues')) {
                user['profile'] = profile.dataValues;
                let token = helpers.generateToken(user);
                user['token'] = token;
                resolve(user);
              }
            });
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
        }
      }).then((user) => {
        // console.log('Password Verification: ::: ', helpers.comparePass(cred.password, user.password));
        if (validUserObj(user)) {
          user = user.dataValues;
          if (cred.password === user.password) {
            models.users.userProfile.findOne({
              where: {
                userUid: user.uid
              }
            }).then((profile) => {
              if (profile !== null && profile.hasOwnProperty('dataValues')) {
                user['profile'] = profile.dataValues;
                let token = helpers.generateToken(user);
                user['token'] = token;
                resolve(user);
              }
            });
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