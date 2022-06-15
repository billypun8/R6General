const { SlashCommandBuilder } = require("@discordjs/builders");
var players = require("../Class/Players");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setplayer")
    .setDescription("Set R6 team player!")
    .addUserOption((option) =>
      option.setName("player1").setDescription("Set R6 team player 1!")
    )
    .addUserOption((option) =>
      option.setName("player2").setDescription("Set R6 team player 2!")
    )
    .addUserOption((option) =>
      option.setName("player3").setDescription("Set R6 team player 3!")
    )
    .addUserOption((option) =>
      option.setName("player4").setDescription("Set R6 team player 4!")
    )
    .addUserOption((option) =>
      option.setName("player5").setDescription("Set R6 team player 5!")
    ),
  async execute(interaction) {
    let newPlayer = [];
    for (let index = 1; index <= 5; index++) {
      newPlayer.push(interaction.options.getUser("player" + index));
    }
    players.setPlayer(newPlayer);
    await interaction.reply("Player set!");
  },
};
