const models = require('../../db/models/index');
const helpers = require('../helpers');
const moment = require('moment');
const bcrypt = require('bcrypt');

let loginUser = () => {

  return { type: 'success', data: { jwt: helpers.generateToken({ email: 'test', password: 'jgkhh' }) } }
}

let createUser = (user, scb, fcb) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt);
  console.log(user.password, helpers.comparePass(user.password, hash));
  models.users.User.create({
    uid: helpers.generateUid(),
    email: user.email,
    password: validatePassword(user.password),
    firstname: user.firstname,
    lastname: user.lastname,
    party: user.party || null
  }).then((a, b) => {
    let user = a.dataValues;
    models.users.userProfile.create({
      uid: helpers.generateUid(),
      firstName: 'First',
      lastName: 'Last',
      userUid: user.uid
    })
  }).catch((a, b) => {
    fcb(a, b)
  });
}

let validatePassword = (password) => {
  return password;
}
module.exports = { loginUser, createUser };
