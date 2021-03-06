const models = require('../../db/models/index');
const helpers = require('../helpers');
const moment = require('moment');
this.sessions = {};

this.createDevice = (socket, cb) => {
  models.sessions.sessionDevice.create({
    uid: helpers.generateUid(),
    type: ''
  }).then((data) => {
    if (cb) {
      cb(data)
    }
  })
};

this.createView = (socket, obj) => {
  let path = obj.path === '/' ? 'Index' : obj.path;
  models.sessions.sessionView.create({
    uid: helpers.generateUid(),
    path: path,
    type: obj.type,
    timeStamp: moment().format(),
    sessionUid: socket.id
  });
}

this.createEvent = (socket, obj, cb) => {
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
this.createSession = (socket) => {
  this.sessions[socket.id] = { status: 'online' }
  // console.log('socket headers: ', socket.handshake);
  // console.log(socket.id, 'session created!');
  models.sessions.Session.create({
    uid: socket.id,
    timeStart: moment().format(),
    device: '81D5XZy98Qi74ccqhr6rh2OuE5kvP7'
  });
};

this.endSession = (socket) => {
  models.sessions.Session.update({
    timeEnd: moment().format()
  }, {
    where: {
      uid: socket.id
    }
  })
  delete this.sessions[socket.id]
}

this.viewSessions = () => {
  return this.sessions;
}

this.getSession = (sessionId) => {
  return new Promise(function(resolve, reject) {
    models.sessions.Session.findById(sessionId)
      .then((session) => {
        resolve(session);
      })
      .catch((error) => {
        reject(error);
      })
  });
}

this.bindUser = (socket, uid) => {
  models.sessions.Session.update({
    userUid: uid
  }, {
    where: {
      uid: socket.id
    }
  }).then((item) => {
    console.log(socket.id, uid);
  })
};

this.createNotification = (data, user) => {
  console.log(data);
  return new Promise(function(resolve, reject) {
    models.users.Notification.create({
        uid: helpers.generateUid(),
        type: data.status,
        title: data.title,
        message: data.message,
        userUid: user,
        priority: data.priority
      })
      .then((item) => resolve(item))
      .catch((error) => reject(error))
  });
}

this.closeNotification = (uid) => {
  return new Promise((resolve, reject) => {
    models.users.Notification.update({ viewedAt: moment().format() }, {
      where: {
        uid: uid
      }
    }).then((item) => {
      console.log('success!!');
      resolve(item)
    }).catch((error) => {
      console.log('failure!!');
      reject(error)
    })
  });
}
module.exports = this