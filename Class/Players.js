class Players {
  players = ["billy"];

  get players() {
    return this.players;
  }

  setPlayer(players) {
    this.players = players;
  }
}

module.exports = new Players();
