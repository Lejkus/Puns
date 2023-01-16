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
  Game.findOneAndUpdate(
    { room: req.body.room },
    {
      $push: {
        games: [
          {
            username: req.body.games[0].user,
            points: 0,
            topic: req.body.games[0].topic,
            game: req.body.games[0].game,
          },
        ],
      },
    },
    //{
    //   $push: {
    //     games: [
    //       {
    //         user: { username: req.body.games[0].user, points: 0, id: "21" },
    //         topic: req.body.games[0].topic,
    //         game: req.body.games[0].game,
    //       },
    //     ],
    //   },
    // },
    function (err, data) {
      if (data) {
        res.send({ Success: "end" });
      } else {
        res.send({ Success: err });
      }
    }
  );
});

router.post("/startquess", function (req, res, next) {
  Game.findOne({ room: req.body.room }, function (err, data) {
    if (data) {
      res.send(data.games);
    } else {
      res.send({ Success: "ERROR" });
    }
  });
});

router.put("/endgame", function (req, res, next) {
  Game.deleteOne({ room: req.body.room }, function (err, data) {
    if (data) {
      res.send({ Success: "gameEnded" });
    } else {
      res.send({ Success: err });
    }
  });
});

module.exports = router;
