// index.js
require("dotenv").config(); // najpierw, żeby mieć dostęp do process.env
const path = require("path");
const http = require("http");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

// === Konfiguracja z .env ===
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3001";

// === Middleware ===
app.use(helmet()); // podstawowe zabezpieczenia nagłówków
app.use(morgan("dev")); // logowanie requestów
app.use(cors({
  origin: CLIENT_ORIGIN,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));
app.use(express.json()); // wbudowany body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")));

// === Routes (przykład) ===
// Upewnij się, że ./routes/game i ./routes/user eksportują routery (module.exports = router)
app.use("/", require("./routes/game"));
app.use("/user", require("./routes/user"));

// === Połączenie z MongoDB (async/await, lepsze logowanie błędów) ===
(async () => {
  try {
    if (!MONGO_URI) throw new Error("Brak MONGO_URI w .env");
    await mongoose.connect(MONGO_URI); // w mongoose >=6 nie trzeba podawać useNewUrlParser itp.
    console.log("MongoDB Connection Succeeded.");
  } catch (err) {
    console.error("Error in DB connection:", err);
    process.exit(1); // jeśli DB jest krytyczne — zakończ proces (opcjonalne)
  }
})();

// === Tworzymy serwer HTTP i podpinamy Socket.IO ===
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ["GET","POST"],
  },
});

// === Socket.IO: obsługa połączeń ===
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("send-message", (room, message, user) => {
    // waliduj/pamiętaj wejście w real app — tu przykład
    io.to(room).emit("receive-message", message, user);
  });

  socket.on("join-room", (room, user) => {
    socket.join(room);
    io.to(room).emit("receive-message", "joined", user);
  });

  socket.on("start-game", (room) => {
    io.to(room).emit("game-started");
  });

  socket.on("start-guess", (room, user) => {
    // poprawiłem 'quess' -> 'guess' dla czytelności
    io.to(room).emit("guess", user);
  });

  socket.on("add-point", (room, user) => {
    io.to(room).emit("adding-point", user);
  });

  socket.on("leave-room", (room) => {
    socket.leave(room);
    console.log(`Socket ${socket.id} left room ${room}`);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Socket disconnected: ${socket.id}. Reason: ${reason}`);
    // nie wywołujemy socket.disconnect() tutaj (już rozłączony)
  });
});

// === Uruchomienie serwera ===
server.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});