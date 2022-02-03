const { createServerTime } = require("../Modules/Util");
const Users = require.main.require("./WDF/Users");
const Lobby = require.main.require("./WDF/Lobby");
const Scoreboard = require.main.require("./WDF/Scoreboard.js");

module.exports = (req, res, next) => {
  const { onlinescore, sid, song_id, star_score } = req.body;

  // Get the requester's profile, if it doesn't exist return 400.
  const player_profile = new Users(sid, true).Get();
  if (!player_profile) return null;

  let response = {
    onlinescore_updated: onlinescore
  };
  
  try {
    new Users(sid).Update({
      onlinescore
    })
  }
  catch(e) {}
  
  
  let playersLobby = new Lobby(player_profile.version).FindLobbyBySID(sid);
  let playersScoreObj = new Scoreboard(player_profile.version).GetScoreBySID(sid);

  let TopNinePlayers = new Scoreboard(player_profile.version).GetTopList(10);
  TopNinePlayers.forEach((player, i) => {
    
      response[`score${i}`] = player.total_score;
      response[`name${i}`] = player.name;
      response[`pays${i}`] = player.pays;
      response[`rank${i}`] = player.rank++;
      response[`avatar${i}`] = player.avatar;
      response[`onlinescore${i}`] = player.onlinescore;
      response[`sid${i}`] = player.sid;
    
  });

  response = {
    ...response,
    count: new Users().Count(player_profile.version),
    total: new Users().Count(player_profile.version) - playersLobby[0].playerCount || 0,
    myrank: playersScoreObj[0].rank,
    myscore: playersScoreObj[0].total_score,
    song_id,
    theme0: 0,
    theme1: 0,
    coach0: 0,
    coach1: 0,
    coach2: 0,
    coach3: 0,
    nb_winners: new Scoreboard(player_profile.version).GetNonEmptyScores().length || 0,
    star_score,
    numscores: TopNinePlayers.length
  };

  return response;
};
