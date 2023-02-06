const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { measureMemory } = require("vm");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chatmessage", (message) => {
    console.log("Message :", message);
    io.to(socket.id).emit("chatmessage", message);
  });
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
