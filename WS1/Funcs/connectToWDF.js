/*
  -- connectToWDF 
  Connect user to the WDF.
 
 --
*/
const { createServerTime } = require("../Modules/Util");
const Users = require.main.require("./WDF/Users")
const Lobby = require.main.require("./WDF/Lobby")
const Token = require.main.require("./WDF/Token")
const Logger = require.main.require("./WS1/Modules/Logger.js")

module.exports = function (req, res, next) {
  
  const { avatar, name, onlinescore, pays } = req.body
  
  // Check if requester has a user object already, if they do send 400.
  // const isUserAlreadyConnected = new Users(req.token.sid).Get()
  // if (isUserAlreadyConnected.sid) return null;
  
  // Get amount of players who has the same country as the requester.
  const players_in_country = new Users().Filter(
    "pays", 
    pays, 
    req.token.sid // We pass requester's sid as "self_sid" so filter function excludes the player.
  ).length
  
  const response = {
    sid: req.token.sid,
    players_in_country,
    t: createServerTime(),
  };
  
  // Create user object for requester with their information.
  const User = new Users(req.token.sid).Create({
    userid: req.token.userid,
    avatar,
    name,
    onlinescore,
    pays,
    version: req.token.gameversion,
    token: req.token
  });

  Logger.info(`${req.token.gameversion} - connectToWDF - ${name} joined World Dance Floor.`)
  
  return response;
  
};