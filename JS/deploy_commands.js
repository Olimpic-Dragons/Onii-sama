const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
    new SlashCommandBuilder().setName('animestoday').setDescription('Listado de animes que se van a emitir hoy'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken("OTg4NDE5NDQ5MzIzNDIxNzM3.GIA-UG.msRIg0vx5VBeAIRrYx_xumTkkFw3F_ztWpmD8E");

rest.put(Routes.applicationGuildCommands("988419449323421737", "590934739435782148"), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);