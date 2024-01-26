import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    platform: "",
    releaseDate: "",
    status: "not started",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/games/${gameId}`);
        const gameData = response.data;
        setFormData(gameData);
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };

    fetchGame();
  }, [gameId]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: null }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title) {
      errors.title = "Title is required";
    }

    if (!formData.platform) {
      errors.platform = "Platform is required";
    }

    if (!formData.releaseDate) {
      errors.releaseDate = "Release Date is required";
    }

    if (!formData.status) {
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
      await axios.put(`http://localhost:8000/api/games/${gameId}`, formData);
      console.log("Game updated successfully!");

      // Redirect to game details page after successful update
      navigate(`/game/${gameId}`);
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };


  return (
    <div className="edit-container">
      <header>Edit {formData.title}</header>
      <div className="Nav">
      <div className="edit-links">
        <Link to="/dashboard" className="edit-link">Back to Dashboard</Link>
        <Link to="/" className="edit-link">Logout</Link>
      </div>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-fields">
          <label>Title</label>
          <input
            onChange={handleChange}
            value={formData.title}
            name="title"
            type="text"
          />
          {formErrors.title && (
            <p style={{ color: "red" }}>{formErrors.title}</p>
          )}
        </div>

        <br />

        <div className="form-fields">
          <label>Genre</label>
          <input
            onChange={handleChange}
            value={formData.genre}
            name="genre"
            type="text"
          />
          {formErrors.genre && (
            <p style={{ color: "red" }}>{formErrors.genre}</p>
          )}
        </div>

        <br />

        <div className="form-fields">
          <label>Platform</label>
          <input
            onChange={handleChange}
            value={formData.platform}
            name="platform"
            type="text"
          />
          {formErrors.platform && (
            <p style={{ color: "red" }}>{formErrors.platform}</p>
          )}
        </div>

        <br />

        <div className="form-fields">
          <label>Release Date</label>
          <input
            onChange={handleChange}
            value={formData.releaseDate}
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
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {formErrors.status && (
            <p style={{ color: "red" }}>{formErrors.status}</p>
          )}
        </div>

        <br />

        <input className="submit-input" type="submit" value="Update" />
      </form>
    </div>
  );
};

export default Edit;