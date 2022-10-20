const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const buttonPages = require("../funciones/pagination.js");
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("animes_hoy")
        .setDescription("Mensaje embed de prueba"),

    async run(message) {
        axios.get('http://localhost:8080/animes/dia')
            .then((res) => {
                console.log("RES:", res.data)
            })
            .catch((err) => {
                console.error("ERR:", err)
            })
    }
}