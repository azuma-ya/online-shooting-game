const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class Game {
	constructor() {
		this.players = new map();
		this.fps = 60;

		const socket = io();

		socket.emit("newPlayer", { x: random(0, 100), y: random(0, 100) });
		socket.on("updatePlayers", (players) => {
			players.forEach((playser) => {});
		});
	}
	start() {
		setInterval(() => this._loop(), 1000 / this.fps);
	}
	_loop() {
		this._updateALL();
		this._renderAll();
	}
	_updateALL() {}
	_renderAll() {}
}

const game = new Game();
