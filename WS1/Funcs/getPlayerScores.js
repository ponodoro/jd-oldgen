const { createServerTime } = require("../Modules/Util");
const Users = require.main.require("./WDF/Users"),
      Scoreboard = require.main.require("./WDF/Scoreboard.js"),
      Lobby = require.main.require("./WDF/Lobby.js")

module.exports = (req, res, next) => {
  
  // not done
  
  let { coachindex, event, lastmove, score, send_score, 
         sid, sid_list, song_id, stars, themeindex, total_score } = req.body
  
  // If sid_list has ; in, split to convert it to an array.
  if (sid_list.includes(";")) {
    sid_list = sid_list.split(";")
    sid_list = sid_list.filter(e =>  e); // This will remove empty results from the array
  }
  
  // Get the requester's profile, if it doesn't exist return 400.
  const player_profile = new Users(sid, true).Get()
  if (!player_profile.sid) return null;
  
  
  let response = {}
  
  let playersLobby;
  
  switch (song_id) {
      
    // If song_id does not exist, it means player requested to join a lobby.
    // We join a lobby.
    case undefined:
    case "":
      
      // If player's user obj doesn't have lobby assigned to it
      // Join the player to a lobby and assign it to their user obj.
      playersLobby = new Lobby(player_profile.version).JoinLobby(sid);
      new Users(sid).Update({
        lobby: playersLobby
      })
      
      return response;

    // Default (which means song_id exists)
    // Player is in a lobby already and requests the score of their teammates.
    default:
      
      playersLobby = new Lobby(player_profile.version).FindLobbyBySID(sid)
      new Scoreboard(player_profile.version).SetScore({
          coachindex,
          event,
          lastmove,
          score,
          send_score,
          sid,
          sid_list,
          song_id,
          stars,
          themeindex,
          total_score: total_score || 0,
          version: player_profile.version,
          name: player_profile.name,
          pays: player_profile.pays,
          onlinescore: player_profile.onlinescore,
          avatar: player_profile.avatar
      });
      
      // If sid_list got players, loop through each and add their scoredata to the response.
      if (sid_list) {
        
        sid_list.forEach((sid, i) => {
          
          let scoreObj = new Scoreboard(player_profile.version).GetScoreBySID(sid)
          
          if (scoreObj[0]) {
            response[`s_${i+1}`] = scoreObj[0].sid // sid
            response[`sc_${i+1}`] = scoreObj[0].total_score || 0; // total_score from body ?
            response[`r_${i+1}`] = scoreObj[0].rank++ || 8; // rank in the wdf
            response[`e_${i+1}`] = scoreObj[0].event || ""; // event from clients body
            response[`c_${i+1}`] = scoreObj[0].coachindex || 0; // coach index
            response[`o_${i+1}`] = scoreObj[0].onlinescore || 1; // online score (in jd15, there was this thing where it would display all the players in a lobby, it shows their rank)
          }
          else {
            response[`s_${i+1}`] = sid
            response[`sc_${i+1}`] = -1
            response[`r_${i+1}`] = 1
          }
          
          
        })
        
      }
      
      if (song_id) {
        
        response = {
          ...response,
          num: playersLobby[0] ? playersLobby[0].playerCount : 1,
          t: createServerTime(),
          score: total_score,
          rank: new Scoreboard(player_profile.version).GetScoreBySID(sid)[0].rank,
          count: new Users().Count(player_profile.version),
          total: playersLobby[0] ? new Users().Count(player_profile.version) - playersLobby[0].playerCount : 0,
          theme0: 0,
          theme1: 0,
          ...new Scoreboard(player_profile.version).GetCoachIndexStats()
        }
        
      }
      
      
      
  }

  return response;
  
};
