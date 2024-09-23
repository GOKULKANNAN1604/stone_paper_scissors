const express = require('express');
const Game = require('../models/game');
const router = express.Router();

// Create a new game
router.post('/newgame', async (req, res) => {
  const { player1, player2, rounds, winner } = req.body;
  const game = new Game({
    player1,
    player2,
    rounds,
    winner
  });
  try {
    const savedGame = await game.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all games
router.get('/gamelist', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
