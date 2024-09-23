import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/games/gamelist')
      .then(response => setGames(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Previous Games</h2>
      <ul>
        {games.map(game => (
          <li key={game._id}>
            {game.player1} vs {game.player2} - Winner: {game.winner}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameList;
