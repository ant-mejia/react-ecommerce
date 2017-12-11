const passport = require('passport');
const models = require('../../db/models/index');

module.exports = () => {
  passport.serializeUser((user, done) => {
    return new Promise(function(resolve, reject) {
      if (user) {
        resolve(user.uid);
      } else {
        reject('ugh!')
      }
    });
  });

  passport.deserializeUser((uid, done) => {
    return new Promise(function(resolve, reject) {
      models.users.findById(uid).then((user) => {
        resolve(user)
      }).catch((err) => {
        reject('boo!');
      });
    });
  });
};