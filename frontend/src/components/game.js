import React, { useState, useEffect } from 'react';
import axios from 'axios';

const choices = ["Stone", "Paper", "Scissors"];

function Game() {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [player1Choice, setPlayer1Choice] = useState("");
    const [player2Choice, setPlayer2Choice] = useState("");
    const [round, setRound] = useState(1);
    const [scores, setScores] = useState({ player1: 0, player2: 0 });
    const [rounds, setRounds] = useState([]);
    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        fetchGameList();
    }, []);

    // Fetch previous games
    const fetchGameList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/games/gamelist');
            setGameList(response.data);
        } catch (error) {
            console.error("Error fetching game list:", error);
        }
    };

    const determineWinner = (choice1, choice2) => {
        if (choice1 === choice2) return "Tie";
        if (
            (choice1 === "Stone" && choice2 === "Scissors") ||
            (choice1 === "Scissors" && choice2 === "Paper") ||
            (choice1 === "Paper" && choice2 === "Stone")
        ) return "Player 1";
        return "Player 2";
    };

    const handleRound = () => {
        const winner = determineWinner(player1Choice, player2Choice);
        const newRound = { roundNumber: round, player1Choice, player2Choice, winner };
        setRounds([...rounds, newRound]);

        if (winner === "Player 1") {
            setScores({ ...scores, player1: scores.player1 + 1 });
        } else if (winner === "Player 2") {
            setScores({ ...scores, player2: scores.player2 + 1 });
        }

        setRound(round + 1);
        setPlayer1Choice("");
        setPlayer2Choice("");
    };

    const saveGame = async () => {
        const winner =
            scores.player1 > scores.player2
                ? player1
                : scores.player1 < scores.player2
                    ? player2
                    : "Tie";
        try {
            await axios.post('http://localhost:5000/api/games/newgame', {
                player1,
                player2,
                rounds,
                winner,
            });

            // Reset the game after saving
            setPlayer1("");
            setPlayer2("");
            setPlayer1Choice("");
            setPlayer2Choice("");
            setScores({ player1: 0, player2: 0 });
            setRounds([]);
            setRound(1);

            // Fetch updated game list
            fetchGameList();
        } catch (error) {
            console.error("Error saving game:", error);
        }
    };

    // Inline styles (same as before)
    const containerStyle = {
        textAlign: 'center',
        marginTop: '30px',
        fontFamily: 'Arial, sans-serif'
    };

    const inputStyle = {
        margin: '10px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    };

    const selectStyle = {
        margin: '10px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        margin: '10px'
    };

    const disabledButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#ccc',
        cursor: 'not-allowed'
    };

    const scoreStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    };

    const tableStyle = {
        margin: '20px auto',
        borderCollapse: 'collapse',
        width: '80%',
    };

    const thStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold',
    };

    const tdStyle = {
        border: '1px solid #ddd',
        padding: '8px',
    };

    return (
        <div style={containerStyle}>
            <h2>Round {round}</h2>
            <input
                style={inputStyle}
                placeholder="Player 1 Name"
                value={player1}
                onChange={e => setPlayer1(e.target.value)}
            />
            <input
                style={inputStyle}
                placeholder="Player 2 Name"
                value={player2}
                onChange={e => setPlayer2(e.target.value)}
            />
            <br />
            <select style={selectStyle} value={player1Choice} onChange={e => setPlayer1Choice(e.target.value)}>
                <option value="">Player 1 Choice</option>
                {choices.map(choice => <option key={choice} value={choice}>{choice}</option>)}
            </select>
            <select style={selectStyle} value={player2Choice} onChange={e => setPlayer2Choice(e.target.value)}>
                <option value="">Player 2 Choice</option>
                {choices.map(choice => <option key={choice} value={choice}>{choice}</option>)}
            </select>
            <br />
            <button
                style={player1Choice && player2Choice ? buttonStyle : disabledButtonStyle}
                onClick={handleRound}
                disabled={!player1Choice || !player2Choice}
            >
                Play Round
            </button>
            {round > 6 && <button style={buttonStyle} onClick={saveGame}>Save Game</button>}
            <h3 style={scoreStyle}>Scores</h3>
            <p>{player1}: {scores.player1}</p>
            <p>{player2}: {scores.player2}</p>

            {/* Display Previous Games */}
            <h2>Previous Games</h2>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        {/* <th style={thStyle}>Game ID</th> */}
                        <th style={thStyle}>Player 1</th>
                        <th style={thStyle}>Player 2</th>
                        <th style={thStyle}>Winner</th>
                        <th style={thStyle}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {gameList.map(game => (
                        <tr key={game._id}>
                            {/* <td style={tdStyle}>{game._id}</td> */}
                            <td style={tdStyle}>{game.player1}</td>
                            <td style={tdStyle}>{game.player2}</td>
                            <td style={tdStyle}>{game.winner}</td>
                            <td style={tdStyle}>{new Date(game.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Game;
