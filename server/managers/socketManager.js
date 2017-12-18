this.logIt = (s) => {
  return s;
}

this.sendData = (responseType = 'success', data, method) => {
  return {
    type: responseType,
    data,
    method
  }
};

this.sendError = (error) => {
  return {
    type: 'error',
    error
  }
}
module.exports = this;