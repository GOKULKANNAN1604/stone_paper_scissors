

const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  player1: { type: String, required: true },
  player2: { type: String, required: true },
  rounds: [
    {
      roundNumber: Number,
      player1Choice: String,
      player2Choice: String,
      winner: String,
    }
  ],
  winner: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Game', gameSchema);
