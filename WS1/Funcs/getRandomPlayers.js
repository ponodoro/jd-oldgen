/*
  -- getRandomPlayers
 List of users, requested for receiving information of those who are in a lobby.
 
 Information: 
 getRandomPlayers is used for listing player's in requesters lobby.
 
 getRandomPlayersWMap is used for listing random players in the menu below.
 https://cdn.discordapp.com/attachments/872155203435114509/897196351899721738/unknown.png
 
 --
*/

const { createServerTime } = require("../Modules/Util");
const Users = require.main.require("./WDF/Users");

module.exports = (req, res, next) => {
  
  const { nr_players, player_sid, sid_list } = req.body;

  // Get the requester's profile, if it doesn't exist return 400.
  const player_profile = new Users(player_sid, true).Get();
  if (!player_profile) return null;

  let response = {
    player_name: new Users(player_sid).Get().name || "" // Assign requester's player name.
  };

  if (!player_profile.lobby || !player_profile.lobby[0]) return response;
  // Get a list of users who are in the lobby of the requester.
  for (let i = 0; i < player_profile.lobby[0].players.length; i++) {
    
    let sid = player_profile.lobby[0].players[i]
    if (sid === player_sid) continue;
    if (i === 1) i--
    
    let userObj = new Users(sid).Get();
    
    response = {
        ...response,
        [`sid${i}`]: userObj.sid,
        [`name${i}`]: userObj.name,
        [`pays${i}`]: userObj.pays,
        [`avatar${i}`]: userObj.avatar,
        [`onlinescore${i}`]: userObj.onlinescore
    };
  }


  // Assign final values.
  response = {
    ...response,
    nr_players: player_profile.lobby[0].playerCount,
    nr_asked: nr_players,
    count: new Users().Count(player_profile.version)
  };

  return response;
};
