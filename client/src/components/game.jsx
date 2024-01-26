import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from 'react-router-dom';

const Game = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [oneGameData, setOneGameData] = useState(null);

  useEffect(() => {
    const fetchOneGameData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/games/${gameId}`);
        const fetchedOneGameData = response.data;
        console.log("Fetched Game Data:", fetchedOneGameData);
        setOneGameData(fetchedOneGameData);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchOneGameData();
  }, [gameId]);

  const deleteHandler = () => {
    axios.delete(`http://localhost:8000/api/games/${gameId}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        // Navigate back to the game list or dashboard
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!oneGameData) {
    // Loading state or error handling
    return <div>Loading...</div>;
  }

  return (
    <div className="game-component">
        <div className="Nav">
      <div className="back-link">
        <Link to="/dashboard">Back to Dashboard</Link>
        
      </div>
      <Link to="/" className="edit-link">Logout</Link>
      </div>
      <h2>{oneGameData.title}</h2>
      <p className="game-info">Genre: {oneGameData.genre}</p>
      <p className="game-info">Platform: {oneGameData.platform}</p>
      <p className="game-info">Release Date: {oneGameData.releaseDate}</p>
      <p className="game-info">Status: {oneGameData.status}</p>

      <button onClick={deleteHandler} className="delete-button">
        Delete
      </button>
    </div>
  );
};

export default Game;
