/*
  -- getRandomPlayersWMap
 List of users, random or by sid list.

 Information: 
 Information: 
 getRandomPlayers is used for listing player's in requesters lobby.
 
 getRandomPlayersWMap is used for listing random players in the menu below.
 https://cdn.discordapp.com/attachments/872155203435114509/897196351899721738/unknown.png
 
 --
 
 --
*/

const { createServerTime } = require("../Modules/Util");
const Users = require.main.require("./WDF/Users");

module.exports = (req, res, next) => {
  
  const { nr_players, player_sid, sid_list } = req.body
  
  // Get the requester's profile, if it doesn't exist return 400.
  const player_profile = new Users(player_sid, true).Get()
  if (!player_profile.sid) return null;
  
  let response = {
    player_name: new Users(player_sid).Get().name || "" // Assign requester's player name.
  };
  
  // Get a list of random users, excluding our sid and including our version,
  // loop for each one, add their info with index to the response.
  let randomUsers = new Users().RandomUsers(nr_players+1, player_sid, player_profile.version)
  randomUsers.forEach((user, i) => {
    
    response = {
      ...response,
      [`sid${i}`]: user.sid,
      [`name${i}`]: user.name,
      [`pays${i}`]: user.pays,
      [`avatar${i}`]: user.avatar,
      [`onlinescore${i}`]: user.onlinescore
    }
    
  });
  
  // Assign final values.
  response = {
      ...response,
      nr_players: randomUsers.length,
      nr_asked: nr_players,
      count: new Users().Count(
        player_profile.version
      ) === 1 ? 0 : new Users().Count(
        player_profile.version
      )
  }

  return response;
};
