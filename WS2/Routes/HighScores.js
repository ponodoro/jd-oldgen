const HighScores = require('express').Router();
const DancerCardDB = require.main.require("./DB/models/DancerProfile");
const LeaderboardDB = require.main.require("./DB/models/Leaderboard");
const Token = require.main.require("./WDF/Token");
const SongDB = require.main.require("./WDF/SongDB");
const multer  = require('multer');
const upload = multer();

HighScores.post("/uploadMyScore", upload.none(), async (req, res) => {

  const { coachId, gameMode, songId, token, totalScore, partialScores } = req.body

  try {
    
    req.profile = Token.Parse(token)
    
    const Dancercard = await DancerCardDB.findOne({ userId: req.profile.userid });
    if (
      !Dancercard || 
      !SongDB.IsMapAvailable(songId, req.profile.gameversion) ||
      parseInt(totalScore * 13333) > 13333
    ) return res.status(400).send()
    
    function ApplyScoreToDancercard() {
      
      // If the songId does not exist in scores, create it.
      if (!Dancercard.scores[songId]) {
        Dancercard.scores[songId] = {
          mapName: songId,
          highest: parseInt(totalScore * 13333),
          timesPlayed: 1,
          lastPlayed: Date.now()
        }
      }
      
      // If the songId exists in scores, compare new and old score and update it.
      else if (Dancercard.scores[songId]) {

        if (parseInt(totalScore * 13333) > Dancercard.scores[songId].highest) {
          Dancercard.scores[songId].highest = parseInt(totalScore * 13333)
        }

        Dancercard.scores[songId].timesPlayed +=1
        Dancercard.scores[songId].lastPlayed = Date.now()

      }
      Dancercard.markModified('scores')
    }
    
    function ApplyScoreToLeaderboard() {
      
    }
    
    ApplyScoreToDancercard()
    await Dancercard.save()
    
    return res.send(Dancercard)
  }
  catch(e) {
    return res.status(400).send({
      errorName: e.name || "",
      errorMessage: e.message || ""
    })
  }

});

module.exports = HighScores;
