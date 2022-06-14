const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('interactionCreate', interaction => {
    console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
});

client.on('message',
    function (messages) {
        if (messages.content.toLocaleLowerCase() === 'hello')
            messages.channel.send('hello' + ' ' + messages.author.username); //reply hello word message with senders name
    })

client.login(token);