const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const buttonPages = require("../funciones/pagination.js");
const { request } = require('undici');
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
let pages = [];
let animes;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("animes-hoy")
        .setDescription("Muestra los animes de hoy"),

    async run(client, interaction) {

        const httpRequest = await request("http://localhost:8080/animes/dia")
            .then(data => getJSONResponse(data.body))
            .catch((err) => console.error(err));
        crearPages();
        buttonPages(interaction, pages, "Anime");
    }
}

// PARSEAR HTTP RESPONSE
async function getJSONResponse(body) {
    animes = [];
    let fullBody = '';
    if (!body) {
        throw new Error("Body vacío");
    }
    for await (const data of body) {
        fullBody += data.toString();
    }
    const json = (JSON.parse(fullBody));
    for (const anime of json) {
        animes.push(anime);
    }
}

// FUNCIÓN PARA CREAR LOS MENSAJES EMBEBIDOS, SE AGREGAN AL ARRAY PAGES
/**
 * FUNCIÓN PARA CREAR LOS MENSAJES EMBEBIDOS, SE AGREGAN AL ARRAY PAGES
 * Usamos ‎ como carácter vacío. Nos ahorrará problemas.
 */
async function crearPages() {
    pages = []

    for (const anime of animes) {
        let fecha;
        if (!anime.descripcion) {
            anime.descripcion = "Sin descripción. "
        }
        if (!anime.fechaInicio) {
            fecha = "‎ "
            anime.fechaInicio = "‎ "
        } else {
            let fechanueva = new Date(anime.fechaInicio)
            console.log(fechanueva)
            fecha = fechanueva.getDay() + "-" + fechanueva.getMonth() + "-" + fechanueva.getFullYear()
        }
        if (!anime.fechaFin) {
            anime.fechaFin = "‎ "
        }
        if (!anime.capitulosEmitidos) {
            anime.capitulosEmitidos = "‎ "
        }
        if (!anime.capitulosTotales) {
            anime.capitulosTotales = "‎ "
        }
        if (!anime.imagen) {
            anime.imagen = "https://cdn.discordapp.com/attachments/471212660461928459/1030951899807088680/unknown.png"
        }
        if (!anime.urlAflv) {
            anime.urlAflv = "https://www3.animeflv.net/"
        }
        if (!anime.statusEnum) {
            anime.statusEnum = "‎ "
        }
        if (!anime.tipoEnum) {
            anime.tipoEnum = "‎ "
        }
        if (!anime.generos) {
            anime.generos = "‎ "
        }
        if (!anime.season) {
            anime.season = "‎ "
        }
        const embed = new MessageEmbed()
            .setColor(0xd5d90b)
            .setTitle(anime.titulo)
            .addFields(
                {
                    name: "‎ ",
                    value: anime.descripcion
                }, {
                    name: "‎ ",
                    value: "__**Información**__"
                }, {
                    name: "Capitulos emitidos",
                    value: anime.capitulosEmitidos,
                    inline: true
                }, {
                    name: "Capitulos previstos",
                    value: anime.capitulosTotales,
                    inline: true
                }, {
                    name: "Formato",
                    value: anime.tipoEnum,
                    inline: true
                }, {
                    name: "Fecha de estreno",
                    value: fecha,
                    inline: true
                }, {
                    name: "‎ ",
                    value: "*API Olimpic Dragons*"
                }
            )
            .setThumbnail(anime.imagen)
            .setURL(anime.urlAflv)
        pages.push(embed)
    }
    if (pages.length < 1) {
        interaction.reply({embeds: [new MessageEmbed().setTitle("No hay animes")]})

    }
}