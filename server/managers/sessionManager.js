const models = require('../../db/models/index');
const helpers = require('../helpers');
const moment = require('moment');
let sessions = {};

let createDevice = (socket, cb) => {
  models.sessions.sessionDevice.create({
    uid: helpers.generateUid(),
    type: ''
  }).then((data) => {
    if (cb) {
      cb(data)
    }
  })
};

let createView = (socket, obj) => {
  let path = obj.path === '/' ? 'Index' : obj.path;
  models.sessions.sessionView.create({
    uid: helpers.generateUid(),
    path: path,
    type: obj.type,
    timeStamp: moment().format(),
    sessionUid: socket.id
  });
}

let createEvent = (socket, obj, cb) => {
  models.sessions.sessionEvent.create({
    uid: helpers.generateUid(),
    type: obj.type,
    target: obj.target,
    originUrl: obj.originUrl,
    targetUrl: obj.targetUrl,
    description: obj.description,
    timestamp: moment().format(),
    sessionUid: socket.id
  }).then((event) => {
    console.log('event');
    cb(event);
  });
}
let createSession = (socket) => {
  sessions[socket.id] = 'online'
  // console.log('socket headers: ', socket.handshake);
  // console.log(socket.id, 'session created!');
  models.sessions.Session.create({
    uid: socket.id,
    timeStart: moment().format(),
    device: 'tAsenlcvTdCZaH5FzqwT2dP12TKYqN'
  });
};

let endSession = (socket) => {
  models.sessions.Session.update({
    timeEnd: moment().format()
  }, {
    where: {
      uid: socket.id
    }
  })
  delete sessions[socket.id]
}

let viewSessions = () => {
  return sessions;
}
module.exports = {
  viewSessions,
  createSession,
  endSession,
  createEvent,
  createView
};
