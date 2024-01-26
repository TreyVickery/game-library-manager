const Game = require("../models/game.model.js");

module.exports = {
    createGame: (req, res) => {
        Game.create(req.body)
            .then((newGame) => res.status(201).json(newGame))
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            });
    },

    getGames: (req, res) => {
        Game.find()
            .then((games) => res.json(games))
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            });
    },

    getGameById: (req, res) => {
        const gameId = req.params.id;
        Game.findById(gameId)
            .then((game) => {
                if (!game) {
                    return res.status(404).json({ error: "Game not found" });
                }
                res.json(game);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            });
    },

    updateGame: (req, res) => {
        const gameId = req.params.id;
        Game.findByIdAndUpdate(gameId, req.body, { new: true })
            .then((updatedGame) => {
                if (!updatedGame) {
                    // Handle the case where the game with the specified ID is not found
                    return res.status(404).json({ error: "Game not found" });
                }
                res.json(updatedGame);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            });
    },

    deleteGame: (req, res) => {
        const gameId = req.params.id;
        Game.findOneAndDelete({ _id: gameId })
            .then((deletedGame) => {
                if (!deletedGame) {
                    return res.status(404).json({ error: "Game not found" });
                }
                res.status(204).send();
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            });
    }
    
};



