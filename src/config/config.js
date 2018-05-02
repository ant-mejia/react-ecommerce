let server = `https://recommerca.herokuapp.com:${process.env.PORT}`;

console.log(process);
const env = process.env.NODE_ENV;

if (env === 'development') {
  server = 'http://localhost:8000';
}

module.exports = server;