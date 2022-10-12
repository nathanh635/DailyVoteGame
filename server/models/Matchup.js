const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const matchupSchema = new Schema({
  game1Title: {
    required: true,
    type: String
  },
  game1Id:       {
    required: true,
    type: Number
  },
  game2Title: {
    type: String,
    required: true
  },
  game2Id: {
    type: Number,
    required: true
  },
  game1Votes: {
    type: Number,
    required: true,
    default: 0,
  },
  game2Votes: {
    type: Number,
    required: true,
    default: 0,
  },
  matchupDate:     {type: Date,
  default: Date.now,
  get: (timestamp) => dateFormat(timestamp),
  }

});

const Matchup = model('Matchup', matchupSchema);

module.exports = Matchup;
