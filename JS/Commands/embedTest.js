const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const buttonPages = require("../Funciones/pagination.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Mensaje embed de prueba"),

    async run(client, interaction) {
        const embed1 = new MessageEmbed()
            .setColor(0x7CF95C)
            .setTitle("Anime 1")
            .setDescription("Descripción del anime 1");

        const embed2 = new MessageEmbed()
            .setColor(0x5CF4F9)
            .setTitle("Anime 2")
            .setDescription("Descripción del anime 2");

        const embed3 = new MessageEmbed()
            .setColor(0xF95C5C)
            .setTitle("Anime 3")
            .setDescription("Descripción del anime 3");

        const pages = [embed1, embed2, embed3];

        await buttonPages(interaction, pages);
    }
}