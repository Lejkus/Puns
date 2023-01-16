var mongoose = require("mongoose");
var Schema = mongoose.Schema;

gameSchema = new Schema({
  room: String,
  started: Boolean,
  games: [
    {
      //user: {},
      userid:Number,
      points:Number,
      topic: String,
      game: Array,
    },
  ],
}),
  Game = mongoose.model("Game", gameSchema);

module.exports = Game;
