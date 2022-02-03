/**
 * Functions
 */

const express = require("express"),
      fs = require("fs"),
      funcs = express.Router(),
      Joi = require('joi')

const Serializer = require("../Modules/Serializer");
const Logger = require.main.require("./WS1/Modules/Logger.js");
const Token = require.main.require("./WDF/Token");

// Schema used for verifying requester's body.
const Schema = {
  checkToken: Joi.object({
    token: Joi.string().required().custom((token) => {return new Token().Decrypt(token)})
  }),
  connectToWDF: Joi.object({
    name: Joi.string().min(1).required(),
    avatar: Joi.number().min(1).required(),
    onlinescore: Joi.number().min(1).max(5000).required(),
    pays: Joi.number().min(1).required(),
    token: Joi.string().custom((token) => {return new Token().Decrypt(token)})
  }),
  disconnectFromWDF: Joi.object({
    sid: Joi.number().required(),
    token: Joi.string().custom((token) => {return new Token().Decrypt(token)})
  }),
  getBloomBergs2: Joi.object({
    sid: Joi.string().required().allow(""),
    token: Joi.string().custom((token) => {return new Token().Decrypt(token)})
  }),
  getMyRank: Joi.object({
    onlinescore: Joi.number().required().default(1),
    sid: Joi.number().required(),
    song_id: Joi.number().required(),
    star_score: Joi.number().required(),
    token: Joi.string().custom((token) => {return new Token().Decrypt(token)})
  }),
  getPlayListPos: Joi.object({
    lang: Joi.string().required(),
    token: Joi.string().custom((token) => {return new Token().Decrypt(token)})
  }),
  getPlayerScores: Joi.object({
    coachindex: Joi.number().min(0).max(3),
    event: Joi.string().required().allow(""),
    lastmove: Joi.number(),
    score: Joi.number().min(0).max(13333),
    send_score: Joi.number(),
    sid: Joi.number().required(),
    sid_list: Joi.string().required().allow(""),
    song_id: Joi.number(),
    stars: Joi.number().min(0).max(7),
    themeindex: Joi.number(),
    total_score: Joi.number().min(0).max(13333),
    token: Joi.string().custom((token) => {return new Token().Decrypt(token)})
  }),
  getRandomPlayersWMap: Joi.object({
    nr_players: Joi.number().max(10).required(),
    player_sid: Joi.number().allow("").required(),
    sid_list: Joi.string().allow("").required(),
    token: Joi.string().custom((token) => {return new Token().Decrypt(token)})
  }),
  getRandomPlayers: Joi.object({
    nr_players: Joi.number().min(1).max(15).required(),
    player_sid: Joi.number().required().required(),
    sid_list: Joi.string().required().allow(""),
    token: Joi.string().custom((token) => {return new Token().Decrypt(token)})
  })

};


const MethodIds = {
  checkToken: 1023,
  connectToWDF: 1166,
  disconnectFromWDF: 1695,
  getBloomBergs2: 1374,
  getMyRank: 914,
  getPlayListPos: 1444,
  getPlayerScores: 1564,
  getRandomPlayers: 1665,
  getRandomPlayersWMap: 2038,
  getServerTime: 1350
};


// ValidateData is for validating client's url-encoded body with Joi schema.
// If the client has missing, invalid body parts, they will get 400 with a message stating the issue.
const ValidateData = function (req, res, next) {

  let q = req.query.d;
  let useragent = req.header("user-agent")
  
  // If the query and the query in Schema exists
  if (q && Schema[q]) {
    
    // Validate the client's body with our schema.
    const { error, value } = Schema[q].validate(req.body, {
      allowUnknown: true
    });
    
    // If validation throws an error, send 400 with a message.
    if (error) {

      let errorJs = {
          method_id: 0,
          err: 3,
          msg: `Error: ${error.details.map(x => x.message).join(', ')}`,
          stat: 0,
      }
      
      switch(useragent.toLowerCase()) {
        case "wiidance":
          res.type("application/x-www-form-urlencoded")
          errorJs = Serializer(errorJs)
          break;
        default:
          res.type("application/json")
          break;
      }
      
      return res.status(400).send(errorJs);
    }
    
    // If validation vas successful, set validated body as req.body and continue.
    else {
        req.body = value;
        next();
    }
    
  } 
  
  // If requested func does not have a schema...
  else {
    
    Logger.info(`Funcs.ValidateData - ${q} does not have a schema. Passing client.`)
    next();
  } 
}

// We need to parse url-encoded request bodys!
funcs.use(express.urlencoded({ extended: false }))

// Main function route
funcs.post("/", ValidateData, (req, res, next) => {
  
  let q = req.query.d;
  let useragent = req.header("user-agent")
  
  
  // If we have the func in our funcs folder & the func exists in MethodIds list
  if (fs.existsSync(`./WS1/Funcs/${q}.js`) && MethodIds[q]) {
    
    if (req.body.token) req.token = req.body.token

    // Require func JS file and append method_id and stat to it.
    let func = (require(`./${q}`)(req, res, next))
    
    if (func === null) return res.status(400).send("method_id=0;err=0;stat=0")
    
    func = {
      method_id: MethodIds[q] || 0,
      ...func,
      stat: 1
    }
    
    // We check the user-agent to see if the client's from the game or from an external API.
    // If client is from the game, the response will be serialized
    // and if they are not, the response will be in JSON.
    
    // tag:UPDATE Responses in JSON should be available to developer ips only.
    switch(useragent.toLowerCase()) {
      case "wiidance":
        res.type("application/x-www-form-urlencoded")
        func = Serializer(func)
        break;
      default:
        res.type("application/json")
        break;
    }

    return res.send(func)
    
  }
  
  // If the requested func does not exist, send 404.
  else return res.status(404).send()
  
})

module.exports = funcs;
