const fs = require("fs");
const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guild } = require("./config.json");
const config = require("./config.json");
const  commands = []
const slashcommandsFiles = fs.readdirSync("./Commands").filter(file => file.endsWith("js"));

for (const file of slashcommandsFiles) {
    const slash = require(`./Commands/${file}`);
    commands.push(slash.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(config.BOT_TOKEN);

createSlash()

async function createSlash() {
    try{
        await rest.put(
            //quitando el GUILD_ID serviría de forma global
            Routes.applicationCommand(clientId, guild), {
                body: commands
            }
        )
        console.log("Slash commands agregados.");
    } catch (e) {
        console.error(e);
        console.log("Fallo al agregar los Slash commands.");
    }
}