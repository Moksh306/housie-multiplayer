
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let rooms = {};

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    socket.join(room);
    socket.room = room;
    socket.name = name;
    if (!rooms[room]) rooms[room] = [];
    rooms[room].push(socket.id);
    console.log(`${name} joined ${room}`);
  });

  socket.on("call", ({ room }) => {
    const number = Math.floor(Math.random() * 90) + 1;
    io.to(room).emit("number-called", { number });
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
