/* 
  -- Scoreboard.js
  Can sort through WDF requests, disconnect users, get scores, create lobbies, etc.

  Scoreboards are Mongoose-based. (Object based for now)
  Scoreboards.js can work with multiple games at once.
*/
const Users = require.main.require("./WDF/Users.js");

const ScoreList = {
  scores: {
    2015: []
  }
};

class Scoreboard {
  constructor(version) {
    this.version = version
  }
  
  All() {
    return ScoreList;
  }

  GetScoreBySID(sid) {
    
    let result = ScoreList.scores[this.version].filter(scores => {
      return scores.sid === Number(sid);
    });
    
    if (!result[0]) return [{
      rank: 0,
      total_score: 0
    }]
    
    return result
    
  }
  
  GetCoachIndexStats() {
    
    let stats = {
      coach0: 0,
      coach1: 0,
      coach2: 0,
      coach3: 0
    }
    
    ScoreList.scores[this.version].filter(scores => {
      if (scores.version == this.version) {
        stats[`coach${scores.coachindex}`] += scores.total_score
      }
      return scores.version === this.version;
    });
    
    return stats
    
    
  }
  
  // Get the first x people from scores. (get top 3 with GetTopList(3))
  GetTopList(n) {
    return ScoreList.scores[this.version].slice(0, n);
  }
  
  GetNonEmptyScores() {
    
    let result = ScoreList.scores[this.version].filter(scores => {
      return scores.total_score > 0
    });
    
    return result;
    
  }

  SetScore(content) {
    
    this.DeleteLastScore(content.sid);

    ScoreList.scores[this.version].push(content);

    // Updated scores array and sort everyone by score.
    ScoreList.scores[this.version] = ScoreList.scores[this.version].sort(function(a, b) {
      return b.total_score - a.total_score;
    });

    // After sorting by score, add rank to everyone.
    ScoreList.scores[this.version] = ScoreList.scores[this.version].map((score, i) => {
      score.rank = i
      return score;
    });

    return;
    
  }

  DeleteLastScore(sid) {
    ScoreList.scores[this.version] = ScoreList.scores[this.version].filter(scores => {
      return scores.sid !== sid;
    });
  }

  ClearScores() {
    ScoreList.scores[this.version] = [];
    return;
  }
}

module.exports = Scoreboard;
