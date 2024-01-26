import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ firstName: 'User' });
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/games')
      .then((res) => {
        console.log(res.data);
        setLibrary(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div>Welcome to your Library</div>
        <Link to="/" onClick={handleLogout} className="logout-link">
          Logout
        </Link>
      </nav>

      <section className="library-section">
        <h2>Game Library</h2>
        <ul>
          {library.map((game) => (
            <div key={game._id} className="game-item">
              <Link to={`/game/${game._id}`} className="game-link">
                {game.title} - {game.status}
              </Link>
              
              <br />
              <button
                onClick={() => navigate(`/game/edit/${game._id}`)}
                className="edit-button"
              >
                Edit
              </button>
             
              
              {/* Remove the following line if deleteGame is not defined */}
              {/* <button onClick={() => deleteGame(game._id)}>Delete</button> */}
            </div>
          ))}
        </ul>
        <Link to="/create" className="add-game-link">
          <button className="add-game-button">Add New Game</button>
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;