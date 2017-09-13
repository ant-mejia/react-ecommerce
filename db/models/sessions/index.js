'use strict';

const Session = require('./session');
const sessionDevice = require('./sessionDevice');
const sessionEvent = require('./sessionEvent');

sessionDevice.hasOne(Session, { as: 'device' });

module.exports = { Session, sessionDevice, sessionEvent };
