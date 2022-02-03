/**
 * 
 * WS1 (WebServer1)
 * ----------------
 * WebServer1 or WS1 is a REST API that is capable of:
 * 
 * - Check WiiMMFI token.
 * - Generate WDF modes and .
 * - Store dancer profiles in Mongoose, edit and create them.
 * - Store leaderboard scores and data in Mongoose.
 * 
 * ----------------
 * Games that use WS1:
 * - Just Dance 2015 (Wii)
 * - Just Dance 2016 (Wii)
 * - Just Dance 2017 (Wii)
 * - Just Dance 2018 (Wii)
 * 
 */


// ---------- Modules ----------

const express = require("express"),
      morgan = require("morgan")

const Logger = require("./Modules/Logger"),
      Config = require("../Config"),
      Funcs = require("./Funcs"),
      Routes = require("./Routes")

const app = express.Router();

// ----------------------------

Logger.welcome(
    `--- WebServer1 (WS1) ---`
)


Logger.info('Setting up Middleware');
app.use(morgan('dev'));
app.use(express.urlencoded({
	extended: true
}));


app.use('/', Funcs);
app.use('/dev', Routes);


app.use((req, res) => {
	res.status(404).send();
});

/** Error handler */
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 400).send()
});

/** Not found (404) handler */
app.use((req, res) => {
  res.status(404).send()
});

module.exports = app;