import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const CreateGame = (props) => {
  const { gameList, setGameList } = props;

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [status, setStatus] = useState("not started");

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate(); // Move the hook outside the asynchronous function

  const handleChange = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "platform":
        setPlatform(e.target.value);
        break;
      case "genre":
        setGenre(e.target.value);
        break;
      case "releaseDate":
        setReleaseDate(e.target.value);
        break;
      case "status":
        setStatus(e.target.value);
        break;
      default:
        break;
    }

    setFormErrors({ ...formErrors, [e.target.name]: null });
  };

  const validateForm = () => {
    const errors = {};

    if (!title) {
      errors.title = "Title is required";
    }

    if (!platform) {
      errors.platform = "Platform is required";
    }

    if (!genre) {
      errors.genre = "Genre is required";
    }

    if (!releaseDate) {
      errors.releaseDate = "Release Date is required";
    }

    if (!status) {
      errors.status = "Status is required";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form has errors. Please fix them.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/games", {
        title,
        platform,
        genre,
        releaseDate,
        status,
      });

      console.log("Game created successfully!", response.data);
      navigate("/dashboard"); // Use the navigate function here

    } catch (error) {
      console.error("Error creating game:", error);
    }
  };
  return (
    <div className="create-container">
      <header className="create-header">Game Manager</header>
      <div className="Nav">
        <div className="create-links">
          <Link to="/dashboard" className="create-link">Back to Dashboard</Link>
        </div>
        <Link to="/" className="create-link">Logout</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <label>Title</label>
          <input
            onChange={handleChange}
            value={title}
            name="title"
            type="text"
          />
          {formErrors.title && (
            <p style={{ color: "red" }}>{formErrors.title}</p>
          )}
        </div>

        <br />

        <div className="form-fields">
          <label>Platform</label>
          <input
            onChange={handleChange}
            value={platform}
            name="platform"
            type="text"
          />
          {formErrors.platform && (
            <p style={{ color: "red" }}>{formErrors.platform}</p>
          )}
        </div>

        <br />

        <div className="form-fields">
          <label>Genre</label>
          <input
            onChange={handleChange}
            value={genre}
            name="genre"
            type="text"
          />
          {formErrors.genre && (
            <p style={{ color: "red" }}>{formErrors.genre}</p>
          )}
        </div>

        <br />

        <div className="form-fields">
          <label>Release Date</label>
          <input
            onChange={handleChange}
            value={releaseDate}
            name="releaseDate"
            type="date"
          />
          {formErrors.releaseDate && (
            <p style={{ color: "red" }}>{formErrors.releaseDate}</p>
          )}
        </div>

        <br />

        <div className="form-fields">
          <label>Status</label>
          <select
            name="status"
            value={status}
            onChange={handleChange}
          >
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {formErrors.status && (
            <p style={{ color: "red" }}>{formErrors.status}</p>
          )}
        </div>

        <br />

        <input className="submit-input" type="submit" value="Create" />
      </form>
    </div>
  );
};

export default CreateGame;






