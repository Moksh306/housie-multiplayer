
const socket = io();
let myName = "", roomCode = "";

function join() {
  myName = document.getElementById("name").value;
  roomCode = document.getElementById("room").value || Math.random().toString(36).substring(2, 8).toUpperCase();
  socket.emit("join", { name: myName, room: roomCode });
  document.getElementById("room-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";
  document.getElementById("room-code-display").innerText = "Room: " + roomCode;
}

function call() {
  socket.emit("call", { room: roomCode });
}

socket.on("number-called", (data) => {
  const el = document.getElementById("called-numbers");
  el.innerHTML += "<span style='margin-right:10px'>" + data.number + "</span>";
});
