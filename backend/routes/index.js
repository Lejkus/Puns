var express = require("express");
var router = express.Router();
var Game = require("../models/Game");

router.put("/findgame", function (req, res, next) {
  Game.findOne({ room: req.body.room }, function (err, data) {
    if (!data) {
      const newGame = new Game({
        room: req.body.room,
        started: false,
      });
      newGame.save(function (err, Game) {
        if (err) console.log(err);
        else res.send({ Success: "NewGameCreated" });
      });
    } else if (data.started === true) {
      res.send({ Success: "GameIsOn" });
    } else {
      Game.findOneAndUpdate(
        { room: req.body.room },
        { $set: { started: false } },
        function (err, data) {
          if (data) {
            res.send({ Success: "JoinedGame" });
          } else {
            res.send({ Success: err });
          }
        }
      );
    }
  });
});

router.put("/startgame", function (req, res, next) {
  Game.findOneAndUpdate(
    { room: req.body.room },
    { $set: { started: true } },
    function (err, data) {
      if (data) {
        res.send({ Success: "gameStarted" });
      } else {
        res.send({ Success: err });
      }
    }
  );
});

router.put("/enddraw", function (req, res, next) {
  console.log(req.body.games[0].game);
  Game.findOneAndUpdate(
    { room: req.body.room },
    {
      $push: {
        games: [
          {
            user: req.body.games[0].user,
            topic: req.body.games[0].topic,
            game: req.body.games[0].game,
          },
        ],
      },
    },
    function (err, data) {
      if (data) {
        res.send({ Success: "gameStarted" });
      } else {
        res.send({ Success: err });
      }
    }
  );
});

router.put("/endgame", function (req, res, next) {
  Game.findOneAndUpdate(
    { room: req.body.room },
    { $set: { started: false } },
    function (err, data) {
      if (data) {
        res.send({ Success: "gameEnded" });
      } else {
        res.send({ Success: err });
      }
    }
  );
});

module.exports = router;
