const { SlashCommandBuilder } = require("@discordjs/builders");
var players = require("../Class/Players");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showplayer")
    .setDescription("Show R6 team player!"),
  async execute(interaction) {
    await interaction.reply(players.showPlayerToString());
  },
};
