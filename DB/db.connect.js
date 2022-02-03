const mongoose = require('mongoose');

const DB = require('./db.config'),
      Config = require.main.require("./Config"),
      Logger = require("../Logger")

if (Config.db.connectToMongoDB) {

  try {

    mongoose.connect(DB.host, DB.opts);

    mongoose.connection.on('connected', () => {
      Logger.info(`[DB] Connected to mongoDB successfully.`)
    });

  }
  catch (e) {

    Logger.error(`[DB] An error occured while connecting to mongoDB...`)
    Logger.error(e)

  }

} else {
  Logger.info(`[DB] Connection to mongoDB is disabled, skipping.`)
}
