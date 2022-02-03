/**
 * 
 * WS2 (WebServer2)
 * ----------------
 * WebServer2 or WS2 is a REST API that is capable of:
 * 
 * - Providing constans which are game's online configuration (Dancer Wall etc.).
 * - Providing all available SR (Star Remix) and Mashup databases.
 * - Store dancer profiles in Mongoose, edit and create them.
 * - Store leaderboard scores and data in Mongoose.
 * 
 * ----------------
 * Games that use WS2:
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
      Routes = require("./Routes")

const app = express.Router();

// ----------------------------

Logger.welcome(
    `--- WebServer2 (WS2) ---`
)

// ---------- Middleware ----------

Logger.info('Setting up Middleware');
app.use(morgan('dev'));
app.use(express.urlencoded({
	extended: true
}));

// -------------------------------


app.use('/', Routes);


app.use((req, res) => {
	res.status(404).send();
});

/** Error handler */
app.use((err, req, res, next) => {
  res.status(err.status || 400).send()
});

/** Not found (404) handler */
app.use((req, res) => {
  res.status(404).send()
});


module.exports = app;