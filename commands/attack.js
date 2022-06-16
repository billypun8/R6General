const { SlashCommandBuilder } = require("@discordjs/builders");
var general = require("../Class/General.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("attack")
        .setDescription("Assign attack operator!")
        .addStingOption((option) =>
            option.setName("filter").setDescription("Filter")
        ),
    async execute(interaction) {
        await interaction.reply(general("attack"));
    },
};
