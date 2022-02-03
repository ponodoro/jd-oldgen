/*
  -- GameIDs.js
 Lists and checks game IDs for JD Wii games.

 -- Made for Wii.
*/

const Logger = require.main.require("./Logger")

// List of Title IDs
const GameIDs = {
  SJO: 2014,
  SE3: 2015,
  SJN: 2016,
  SZ7: 2017,
  SE8: 2018
}

// Get game version by Title Id.
function GetById(id) {
  return GameIDs[id.toUpperCase()]
}

// Get Title Id by the game version.
function GetByVersion(version = 2015) {
  return Object.keys(GameIDs).find(key => GameIDs[key] === version);
}

// Check for Title Id.
function IsIdAvailable(id) {
  let result = GetById(id)
  
  if (result) return true;
  else {
    Logger.info(`GameIDs.IsIdAvailable - ${id} is not an available gameId, are we sure it's not missing?`)
    return false;
  }
}


module.exports = {
  GetById,
  GetByVersion,
  IsIdAvailable
}