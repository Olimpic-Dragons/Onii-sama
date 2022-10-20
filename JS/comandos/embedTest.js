const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const buttonPages = require("../funciones/pagination.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Mensaje embed de prueba"),

    async run(client, interaction) {
        const embed1 = new MessageEmbed()
            .setColor(0x0099ff)
            .setTitle("Anime 1")
            .setDescription("Descripción del anime 1");

        const embed2 = new MessageEmbed()
            .setColor(0x0099ff)
            .setTitle("Anime 2")
            .setDescription("Descripción del anime 2");

        const embed3 = new MessageEmbed()
            .setColor(0x0099ff)
            .setTitle("Anime 3")
            .setDescription("Descripción del anime 3");

        const pages = [embed1, embed2, embed3];

        await buttonPages(interaction, pages);
    }
}