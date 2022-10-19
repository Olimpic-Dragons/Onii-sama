const Discord = require("discord.js");
const intents = new Discord.Intents();
const config = require("./config.json");
const {request} = require('undici');
const paginationEmbed = require('discordjs-button-pagination');
const {MessageEmbed} = require('discord.js');

// CREA EL CLIENTE
const client = new Discord.Client({intents: 32767});

// SE EJECUTA CUANDO SE INICIA EL BOT
client.on('ready', () => console.log("Estoy listo"));

const fs = require("fs");
let {readdirSync} = require("fs");

// Para manejar los comando con prefijo. Lo dejo por si algún día lo usamos
client.commands = new Discord.Collection();
const commandsFiles = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
for (const file of commandsFiles) {
    const command = require(`./Commands/${file}`);
    client.commands.set(command.name, command);
}

//Para manejar los comandos con "/"
client.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs.readdirSync("./Commands").filter(file => file.endsWith("js"));

for (const file of slashcommandsFiles) {
    //const commandName = file.split(".")[0];
    const slash = require(`./Commands/${file}`);
    console.log(`Slash commands - ${file} cargado.`);
    client.slashcommands.set(slash.data.name, slash);
}
;

client.on("interactionCreate", async (interaction) => {
    /**
     * Majejo de slashcommands
     */
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

