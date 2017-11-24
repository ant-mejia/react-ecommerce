'use strict';

const User = require('./user');
const userProfile = require('./profile');

userProfile.belongsTo(User);
module.exports = { User, userProfile };
