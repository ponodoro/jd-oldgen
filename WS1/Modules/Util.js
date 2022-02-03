function createServerTime() { 
  return Number((Date.now() / 1000).toString().substring(1));
}

module.exports = {
  createServerTime
}