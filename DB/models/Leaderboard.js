/*
const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    userId: {
      type: Number,
      required: true
    },
    avatar: {
        type: Number,
        required: true,
        default: 1
    },
    country: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        default: "Player"
    },
    songsPlayed: {
        type: Number,
        default: 0
    },
    stars: {
        type: Number,
        default: 0
    },
    unlocks: {
        type: Number,
        default: 0
    },
    score: {
      type: Number,
      default: 0,
      min: [0],
      max: 13333
  }
}, {
    minimize: false,
    versionKey: false
})

module.exports = mongoose.model("Leaderboard", Schema)
*/