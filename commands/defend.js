const { SlashCommandBuilder } = require("@discordjs/builders");
var general = require("../Class/General.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("defend")
        .setDescription("Assign defend operator!")
        .addStringOption((option) =>
            option.setName("filter").setDescription("Set filter type.")
        ).addStringOption((option) =>
            option.setName("filter_value").setDescription("Set filter value.")
        ),
    async execute(interaction) {
        const filter = interaction.options.getString('filter');
        var filterValue = interaction.options.getString('filter_value');
        var filterType = ['color', 'speed', 'diff', 'armor', 'skin'];

        if (filter) {
            if (!filterType.includes(filter) || !filterValue) {
                await interaction.reply('Wrong filter type/value. Assign operators without filter.\n\n' + general("defend"));
            } else {
                try {
                    let intOptions = ['speed', 'armor', 'diff'];
                    if (intOptions.includes(filter)) {
                        filterValue = parseInt(filterValue);
                    }
                    await interaction.reply(`Assign defender with ${filter} = ${filterValue}.\n\n` + general("defend", filter, filterValue));
                } catch (error) {
                    await interaction.reply('Wrong filter value. Assign operators without filter.\n\n' + general("defend"));
                }
            }
        } else {
            await interaction.reply(general("defend"));
        }
    },
};
