'use strict';

const Session = require('./session');
const sessionDevice = require('./sessionDevice');
const sessionEvent = require('./sessionEvent');
const sessionView = require('./sessionView');
const sessionSearch = require('./sessionSearch');

sessionEvent.belongsTo(Session);
sessionView.belongsTo(Session);
sessionDevice.hasOne(Session, { foreignKey: 'device' });

module.exports = { Session, sessionDevice, sessionEvent, sessionView, sessionSearch };
