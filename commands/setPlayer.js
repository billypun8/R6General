const { SlashCommandBuilder } = require("@discordjs/builders");
var players = require("../Class/Players");

module.exports = {

  // Set options to set player.
  data: new SlashCommandBuilder()
    .setName("setplayer")
    .setDescription("Set R6 team player!")
    .addUserOption((option) =>
      option.setName("player1").setDescription("Set R6 player 1!")
    )
    .addUserOption((option) =>
      option.setName("player2").setDescription("Set R6 player 2!")
    )
    .addUserOption((option) =>
      option.setName("player3").setDescription("Set R6 player 3!")
    )
    .addUserOption((option) =>
      option.setName("player4").setDescription("Set R6 player 4!")
    )
    .addUserOption((option) =>
      option.setName("player5").setDescription("Set R6 player 5!")
    ),
  async execute(interaction) {
    let newPlayer = [];
    for (let index = 1; index <= 5; index++) {
      newPlayer.push(interaction.options.getUser("player" + index));
    }

    // Filter out repeated and null
    var filtered_player = newPlayer.filter(function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }).filter(value => value != null).filter(value => value.bot != true);

    players.setPlayer(filtered_player);
    await interaction.reply(`Player set! ${players.showPlayerToString()}`);
  },
};
