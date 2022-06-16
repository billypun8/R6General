class Players {
  players = [];

  get players() {
    return this.players;
  }

  setPlayer(players) {
    this.players = players;
  }

  showPlayerToString() {
    if (this.players.length == 0) {
      return "No Player!"
    }
    let msg = 'Players are ' + this.players.join(', ') + '.';
    return msg;
  }
}

module.exports = new Players();
