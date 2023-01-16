var express = require("express");
var env = require("dotenv").config();
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//----mongodb
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
//----mongodb


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));

app.use("/", require("./routes/game"));
app.use("/user", require("./routes/user"));

//------------------io
const io = require("socket.io")(8000, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {

  socket.on("send-message", (room, message, user) => {
    io.in(room).emit("receive-message", message ,user );
  });

  socket.on("join-room", (room, user) => {
    socket.join(room);
    io.in(room).emit("receive-message", "joined",user);
  });

  socket.on("start-game",(room)=>{
    io.in(room).emit("game-started")
  })

  socket.on('start-quess',(room,user)=>{
    io.in(room).emit('quess',user)
  })

  socket.on('add-point',(room,user)=>{
    io.in(room).emit('adding-point',user)
  })

  socket.on("leave-room",(room)=>{
    socket.leave(room);
    console.log('leave room:' + room);
  })

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
