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
          bcrypt.hash(personInfo.password, 5)
  .then((hash) => {
    const newPerson = new User({
      email: personInfo.email.toLowerCase(), // zawsze lowercase
      username: personInfo.username,
      password: hash,
      stats: {
        points: 0,
        games_played: 0,
        won: 0,
        podiums: 0,
      },
    });
    return newPerson.save();
  })
  .then((savedUser) => {
    console.log("User registered:", savedUser.email);
    res.send({ Success: "You are registered, You can login now." });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({ Error: "Error saving user" });
  });
        } else {
          res.send({ Success: "Email is already used." });
        }
      });
    } else {
      res.send({ Success: "password is not matched" });
    }
  }
});

router.post("/login", function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) return res.send({ Success: "This Email Is not registered!" });

    bcrypt.compare(req.body.password, user.password).then((match) => {
      if (match) {
        res.send({ Success: "Loging succes!", userdata: user });
      } else {
        res.send({ Success: "Wrong password!" });
      }
    });
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
