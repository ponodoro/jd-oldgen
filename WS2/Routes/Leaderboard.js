const Leaderboard = require('express').Router(),
      Serializer = require("../Modules/Serializer")

Leaderboard.post("/getWorldWideLeaderBoard", (req, res) => {

    res.send("")
})

Leaderboard.post("/getCountryLeaderBoard", (req, res) => {

  res.send("")
    
})

module.exports = Leaderboard;
