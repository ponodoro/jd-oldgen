const { createServerTime } = require("../Modules/Util");
const Config = require.main.require("./Config").ws1.Constants;

module.exports = (req, res, next) => {

  let response = {
    t: createServerTime(), // -- TIMESTAMP
    sendscore_interval: Config.IntervalOfSendScore, // -- INTERVAL BETWEEN getPlayerScores REQUESTS (SECONDS).
  };

  return response;
};
