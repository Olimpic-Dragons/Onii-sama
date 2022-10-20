const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const config = require("./config.json");
const  commands = []
const slashcommandsFiles = fs.readdirSync("./comandos").filter(file => file.endsWith("js"));

for (const file of slashcommandsFiles) {
    const slash = require(`./comandos/${file}`);
    commands.push(slash.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(config.BOT_TOKEN);

createSlash()

async function createSlash() {
    try{
        await rest.put(
            //quitando el GUILD_ID serviría de forma global
            Routes.applicationCommands(config.clientId, config.guild), {
                body: commands
            }
        )
        console.log("Slash commands agregados.");
    } catch (e) {
        console.error(e);
        console.log("Fallo al agregar los Slash commands.");
    }
}