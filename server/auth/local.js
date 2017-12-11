const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const models = require('../../db/models/index');
const authHelpers = require('./auth-helpers');

const options = {
  usernameField: 'email',
  session: true
};

init();

passport.use(new LocalStrategy(options, (email, password, done) => {
  // check to see if the email exists
  models.Users.findOne({
    where: {
      email: email
    }
  }).then((user) => {
    return new Promise(function(resolve, reject) {
      if (!user || !authHelpers.comparePass(password, user.dataValues.password)) {
        reject('Incorrect email/password');
      } else {
        resolve(user.dataValues);
      }
    });
  }).catch((err) => {
    return new Promise(function(resolve, reject) {
      reject('Local.js line 31')
    });
  });
}));

module.exports = passport;