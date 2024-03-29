/* Versión 0.1 */
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const config = require("../config.json");

// CREA EL CLIENTE
const client = new Client({intents: 32767});

// SE EJECUTA CUANDO SE INICIA EL BOT
client.on('ready', () => console.log("Estoy listo"));

/**
 * Manejo de slashcommands
 */
const fs = require("fs");
let {readdirSync} = require("fs");

client.slashCommands = new Collection();
const slashCommandsFiles = fs
    .readdirSync("./src/comandos")
    .filter(file => file.endsWith("js"));

for (const file of slashCommandsFiles) {
    const slash = require(`./comandos/${file}`);
    console.log(`Slash commands - ${file} cargado.`);
    client.slashCommands.set(slash.data.name, slash);
}

client.on("interactionCreate", async (interaction) => {

    if (!interaction.isCommand()) return;
    const slashCommands = client.slashCommands.get(interaction.commandName);
    if (!slashCommands) return;

    try {
        await slashCommands.run(client, interaction);
        console.log("Interaction creada!")
    } catch (e) {
        console.error(e);
        console.log("Error al crear la interaction!");
        throw e;
    }

});

client.login(config.BOT_TOKEN)