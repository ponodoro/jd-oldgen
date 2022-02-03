/**
 * Routes
 */

const express = require("express"),
      routes = express.Router(),
      { uniqueNamesGenerator, names  } = require('unique-names-generator');

const Users = require.main.require("./WDF/Users");
const Scoreboard = require.main.require("./WDF/Scoreboard");
const Lobby = require.main.require("./WDF/Lobby");
const Playlist = require.main.require("./WDF/Playlist");
const SongDB = require.main.require("./WDF/SongDB");
const DancerCardDB = require.main.require("./DB/models/DancerProfile");
const { createServerTime } = require("../Modules/Util");

routes.get("/screens", (req, res) => {
  
  new Playlist(2015).GetScreen()
  res.send(
    new Playlist(2015).All()
  )
  
})

routes.get("/stats", (req, res, next) => {

  res.send({
    Users: new Users().Init(),
    Scoreboard: new Scoreboard().All(),
    Lobby: new Lobby().All(),
    //PlayList: new Playlist().All(),
    ServerTime: createServerTime()
  })
  
});

routes.get("/songdb", (req, res) => {
  res.send(SongDB.Main)
});

routes.get("/all-players", async (req, res) => {
  
  const dancercards = await DancerCardDB.find()
  res.json(dancercards)
  
})

routes.post("/create-bots", (req, res) => {
  
  let amountOfBots = req.query.amount
  let joinLobby = req.query.joinlobby
  if (!amountOfBots || amountOfBots === 0 || amountOfBots > 5000) {
    return res.status(400).send({
      message: `"amount" query is either missing or can't equal 0 or can't be higher than 5000.`
    })
  }
  
  // Loop amountOfBots times and create bots with random SIDs.
  for (let i = 0; i < amountOfBots; i++) {
    
    const versionsArray = [2015, 2016, 2017];
    const randomSid = Math.floor(Math.random() * 100000000) + 999999999
    let BotObj = {
      avatar: i+1,
      name: uniqueNamesGenerator({
          dictionaries: [names],
          style: "upperCase",
          separator: ""
      }),
      onlinescore: 100,
      pays: 1,
      bot: true,
      sid: randomSid,
      version: 2015
    }
    new Users(randomSid).Create(BotObj);
    
    if (joinLobby) {
      new Lobby(BotObj.version).JoinLobby(randomSid);
    }
    
    
  }
  
  return res.send("")
  
  
})

module.exports = routes;
