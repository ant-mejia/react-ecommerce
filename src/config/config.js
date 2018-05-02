let server = 'https://recommerca.herokuapp.com';

const env = process.env.NODE_ENV;

if (env === 'development') {
  server = 'http://localhost:8000';
}

module.exports = server;