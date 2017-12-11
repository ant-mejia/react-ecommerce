this.logIt = (s) => {
  return s;
}

this.sendData = (responseType, data) => {
  return {
    type: responseType,
    data
  }
}
module.exports = this;