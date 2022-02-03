/*
const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
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
    wdfRank: {
      type: Number,
      default: 1,
      min: [1],
      max: 5000
    },
    scores: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    minimize: false,
    versionKey: false
  }
);

module.exports = mongoose.model("DancerCard", Schema);
*/