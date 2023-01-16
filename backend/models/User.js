var mongoose = require("mongoose");
var Schema = mongoose.Schema;

(userSchema = new Schema({
  unique_id: Number,
  email: String,
  username: String,
  password: String,
  active: Boolean,
  stats: {
    points: Number,
    games_played: Number,
    won: Number,
    podiums: Number,
  },
})),
  (User = mongoose.model("User", userSchema));

module.exports = User;
