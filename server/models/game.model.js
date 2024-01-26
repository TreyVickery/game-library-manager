const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
    },
    platform: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["not started", "in progress", "completed"], 
        default: "not started", 
    },
}, { timestamps: true });

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;

