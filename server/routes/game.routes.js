const express = require("express");
const GameController = require("../controllers/game.controller");
const router = express.Router();

router.post("/games", GameController.createGame);
router.get("/games", GameController.getGames);
router.get("/games/:id", GameController.getGameById);
router.put("/games/:id", GameController.updateGame);
router.delete("/games/:id", GameController.deleteGame);

module.exports = router;
