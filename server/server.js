const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5176"] }));

require("./config/mongoose.config");

const userRoutes = require("./routes/user.routes");
const gameRoutes = require("./routes/game.routes");

app.use("/api", userRoutes);  // Use /api prefix for user routes
app.use("/api", gameRoutes);  // Use /api prefix for game routes

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(8000, () => console.log("Listening on Port 8000"));






