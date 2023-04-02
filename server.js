const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

class Game {
	constructor() {
		this.io = io;
		this.players = {};
		this.fps = 60;

		this.io.on("connection", (socket) => {
			socket.on("newPlayer", (data) => {
				this.players[socket.id] = data;
				console.log("New clinet connected with id:" + socket.id);
				console.log("Current number of players:" + this.players.size);
				this.io.emit("updatePlayers", this.players);
			});

			socket.on("disconnect", () => {
				this.players.delete(socket.id);
				console.log("Goodbye clinet with id:" + socket.id);
				console.log("Current number of players:" + this.players.size);
				this.io.emit("updatePlayers", this.players);
			});
		});
	}
	start() {
		setInterval(() => this._loop(), 1000 / this.fps);
	}
	_loop() {
		this._updateALL();
	}
	_updateALL() {
		this.io.emit("updatePlayers", this.players);
	}
}

const game = new Game();

server.listen(PORT, () => {
	console.log(`server is running on PORT ${PORT}`);
	game.start();
});
