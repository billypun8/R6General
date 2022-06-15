const { SlashCommandBuilder } = require("@discordjs/builders");
var players = require("../Class/Players");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showplayer")
    .setDescription("Show R6 team player!"),
  async execute(interaction) {
    console.log(players.players);
    await interaction.reply("Player show!");
  },
};
