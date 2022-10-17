
const Discord = require('discord.js');
const intents = new Discord.Intents();
const config = require('./config.json');
const fetch = require('node-fetch');

// CREA EL CLIENTE
const client = new Discord.Client({ intents: 32767 });

const fs = require("fs");
let { readdirSync } = require("fs");


// client.commands = new Discord.Collection();
// const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
// for (const file of commands) {
//     const commandName = file.split(".")[0];
//     const command = require(`./Commands/${commandName}`);
//     client.commands.set(commandName, command);
// }
// SE EJECUTA CUANDO SE INICIA EL BOT
client.on('ready', () => console.log("Estoy listo"));

client.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));

for(const file of slashcommandsFiles) {
    //const commandName = file.split(".")[0];
    const command = require(`./Commands/${file}`);
    console.log(`Slash commands - ${file} cargado.`);
    client.slashcommands.set(command.data.name, command);
}

client.on("interactionCreate", async(interaction) => {
    if (!interaction.isCommand()) return;

    const Commands = client.slashcommands.get(interaction.commandName);

    if (!Commands) return;

    try {
        await Commands.run(client, interaction);
    } catch (e) {
        console.error(e);
    }

})

// PLANTILLA
client.on("messageCreate", message => {
    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift();
        const command = client.commands.get(commandName);
        if (!command) {
            command.run(client, message, args);
        }
    }
})

client.login(config.BOT_TOKEN)

