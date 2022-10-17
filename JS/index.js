const Discord = require('discord.js');
const config = require('./config.json');

// CREA EL CLIENTE
const client = new Discord.Client({intents: 32767});

// SE EJECUTA CUANDO SE INICIA EL BOT
client.on('ready', () => console.log("Estoy listo"))


client.login(config.BOT_TOKEN)
