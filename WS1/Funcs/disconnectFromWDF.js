const { createServerTime } = require("../Modules/Util");
const Users = require.main.require("./WDF/Users")
const Lobby = require.main.require("./WDF/Lobby")
const Scoreboard = require.main.require("./WDF/Scoreboard")   
const Logger = require.main.require("./WS1/Modules/Logger.js");

module.exports = (req, res, next) => {

  const { sid } = req.body
  
  // Get the requester's profile, if it doesn't exist return 400.
  const player_profile = new Users(sid, true).Get()
  if (!player_profile.sid) return null;
  
  const response = {};
  
  // If requester's sid is already a player in our User database, disconnect them.
  // If they are not, they will receive 400.
  if (new Users(sid).UserExists()) {
    
    let userObj = new Users(sid).Get();

    Logger.info(`disconnectFromWDF - ${userObj.name} left the World Dance Floor.`)
    new Users(sid).Delete();
    new Lobby(player_profile.version).LeaveLobby(sid);
    new Scoreboard(player_profile.version).DeleteLastScore(sid);
    
  }
  else return null;
  
  return response;
};
