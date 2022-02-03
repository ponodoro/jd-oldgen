/**
 * Routes
 */

const express = require("express"),
      routes = express.Router()

const Token = require.main.require("./WDF/Token");

routes.use(express.urlencoded({ extended: false }));

const WS2Authentication = (req, res, next) => {
  
  const usertoken = req.body.token

  if (Token.Parse(usertoken)) {
    req.profile = Token.Parse(usertoken)
    next()
  }
  else return res.status(400).send()
  
}


routes.use("/ConstantProvider", require("./ConstantProvider"))
routes.use("/DancerCard", WS2Authentication, require("./DancerCard"))
routes.use("/HighScores", require("./HighScores"))
routes.use("/Leaderboard", WS2Authentication, require("./Leaderboard"))
routes.use("/Mashup", WS2Authentication, require("./Mashup"))
routes.use("/StarChallenge", WS2Authentication, require("./StarChallenge"))


module.exports = routes;
