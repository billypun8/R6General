const fs = require("node:fs");
const path = require("node:path");
const { Client, Intents, Collection } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");

// Prepare Bot
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

// On Ready print msg
client.once("ready", () => {
  console.log("Ready!");
});

// Command handling
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Reply Msg
client.on("message", function (messages) {
  if (messages.content.toLocaleLowerCase() === "hello")
    messages.channel.send("hello" + " " + messages.author.username); //reply hello word message with senders name
});

// BOT
client.login(token);
