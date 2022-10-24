const Discord = require("discord.js");
const intents = new Discord.Intents();
const config = require("./config.json");
const {request} = require('undici');
const {MessageEmbed} = require('discord.js');

// CREA EL CLIENTE
const client = new Discord.Client({intents: 32767});

// SE EJECUTA CUANDO SE INICIA EL BOT
client.on('ready', () => console.log("Estoy listo"));

/**
 * Manejo de slashcommands
 */
const fs = require("fs");
let {readdirSync} = require("fs");

client.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs.readdirSync("./comandos").filter(file => file.endsWith("js"));

for (const file of slashcommandsFiles) {
    const slash = require(`./comandos/${file}`);
    console.log(`Slash commands - ${file} cargado.`);
    client.slashcommands.set(slash.data.name, slash);
}

client.on("interactionCreate", async (interaction) => {

    if (!interaction.isCommand()) return;
    const slashcmds = client.slashcommands.get(interaction.commandName);
    if (!slashcmds) return;

    try {
        await slashcmds.run(client, interaction);
        console.log("Interaction creada!")
    } catch (e) {
        console.error(e);
        console.log("Error al crear la interaction!");
        throw e;
    }

});

client.login(config.BOT_TOKEN)

