var express = require("express");
var router = express.Router();
var Game = require("../models/Game");

router.post("/", function (req, res, next) {
  Game.findOne({ room: req.body.room }, function (err, data) {
    if (data) {
      if (data.password == req.body.password) {
        res.send({ Success: "Loging succes!" });
      } else {
        res.send({ Success: "Wrong password!" });
      }
    } else {
      res.send({ Success: "This name Is not regestered!" });
    }
  });
});

router.put("/findgame", function (req, res, next) {
  Game.findOne({ room: req.body.room }, function (err, data) {
    if (!data) {
      const newGame = new Game({
        room: req.body.room,
        started: false,
        games: [
          {
            user: String,
            topic: String,
            game: [],
          },
        ],
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
