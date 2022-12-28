var express = require("express");
var env = require("dotenv").config();
var ejs = require("ejs");
var path = require("path");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://brad1234:1234@store.okm5n2u.mongodb.net/kalambury",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/views"));

// var index = require("./routes/index");
// app.use("/", index);

//------------------io
const io = require("socket.io")(8000, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {

  socket.on("send-message", (room, message) => {
    //console.log(socket.rooms);
    io.in(room).emit("receive-message", message );
  });

  socket.on("join-room", (room, user) => {
    socket.join(room);
    console.log(room, user, "joined");
    io.in(room).emit("receive-message", user + " " + "joined");
  });

  socket.on("disconnect", (reason) => {
    socket.disconnect();
    socket = null;
  });
});
//------------------io

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server is started on http://127.0.0.1:" + PORT);
});
