const { EmbedBuilder } = require("discord.js");
const buttonPages = require("../../JS/functions/pagination");

module.exports = {
    name: "embed",
    description: "test",

    run: async (client, interaction) => {
        const embed1 = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("1")
            .setDescription("Descripción del emebed 1");

        const embed2 = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("2")
            .setDescription("Descripción del emebed 2");

        const embed3 = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("3")
            .setDescription("Descripción del emebed 3");

        const pages = [embed1, embed2, embed3];

    },
}