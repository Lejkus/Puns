var express = require("express");
var router = express.Router();
var User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", function (req, res, next) {
  var personInfo = req.body;

  if (!personInfo.email || !personInfo.username || !personInfo.password) {
    res.send();
  } else {
    if (personInfo.password == personInfo.passwordConf) {
      User.findOne({ email: personInfo.email }, function (err, data) {
        if (!data) {
          bcrypt
            .hash(personInfo.password, 5)
            .then(function (hash) {
              return (newPerson = new User({
                email: personInfo.email,
                username: personInfo.username,
                password: hash,
                active: false,
                stats: {
                  points: 0,
                  games_played: 0,
                  won: 0,
                  podiums: 0,
                },
              }));
            })
            .then((newPerson) => {
              newPerson.save(function (err, Person) {
                if (err) console.log(err);
                else console.log("Success");
              });
            });

          res.send({ Success: "You are regestered,You can login now." });
        } else {
          res.send({ Success: "Email is already used." });
        }
      });
    } else {
      res.send({ Success: "password is not matched" });
    }
  }
});

router.post("/login", function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, data) {
    if (data) {
      if (data.active) {
        res.send({ Success: "You already active!" });
      } else {
        bcrypt
          .compare(req.body.password, data.password)
          .then(function (result) {
            if (result) {
              User.findOneAndUpdate(
                { email: req.body.email },
                { $set: { active: true } },
                () => {
                  res.send({ Success: "Loging succes!", userdata: data });
                }
              );
            } else {
              res.send({ Success: "Wrong password!" });
            }
          });
      }
    } else {
      res.send({ Success: "This Email Is not regestered!" });
    }
  });
});

router.post("/profile", function (req, res, next) {
  User.findOne({ username: req.body.username }, function (err, data) {
    if (data) {
      res.send(data);
    } else {
      res.send();
    }
  });
});

router.put("/logout", function (req, res, next) {
  User.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { active: false } },
    () => {
      res.send({ Success: "logout!" });
    }
  );
});

router.put("/updatestats", function (req, res, next) {
  User.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        stats: {
          games_played: req.body.stats.games_played,
          podiums: req.body.stats.podiums,
          points: req.body.stats.points,
          won: req.body.stats.won,
        },
      },
    },
    function (err, data) {
      
    }
  );
});

router.post("/forgetpass", function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, data) {
    if (!data) {
      res.send({ Success: "This Email Is not regestered!" });
    } else {
      // res.send({"Success":"Success!"});
      if (req.body.password == req.body.passwordConf) {
        data.password = req.body.password;
        data.passwordConf = req.body.passwordConf;

        data.save(function (err, Person) {
          if (err) console.log(err);
          else console.log("Success");
          res.send({ Success: "Password changed!" });
        });
      } else {
        res.send({
          Success: "Password does not matched! Both Password should be same.",
        });
      }
    }
  });
});

module.exports = router;
