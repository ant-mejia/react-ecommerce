const models = require('../../db/models/index');
const helpers = require('../helpers');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let loginUser = () => {

  return { type: 'success', data: { jwt: helpers.generateToken({ email: 'test', password: 'jgkhh' }) } }
}

let createUser = (user, scb, fcb) => {
  models.users.User.create({
    uid: helpers.generateUid(30, true),
    email: user.email,
    password: validatePassword(user.password),
    firstname: user.firstname,
    lastname: user.lastname,
    party: user.party || null
  }).then((user) => {
    user = user.dataValues;
    models.users.userProfile.create({
      uid: helpers.generateUid(),
      firstName: 'First',
      lastName: 'Last',
      userUid: user.uid
    }).then((profile) => {
      user.profile = profile.dataValues;
      let token = jwt.sign(user, process.env.SK);
      scb({ user, token });
    }).catch((a, b) => {
      fcb(a, b)
    });
  }).catch((a, b) => {
    fcb(a, b)
  });
}

let validatePassword = (password) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  console.log(password, helpers.comparePass(password, hash));
  return hash;
}
module.exports = { loginUser, createUser };
