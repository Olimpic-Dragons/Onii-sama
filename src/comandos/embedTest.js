const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js");
const buttonPages = require("../funciones/pagination.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed-test")
        .setDescription("Mensaje embed de prueba"),

    async run(client, interaction) {
        const embed1 = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Tensei shitara Ken Deshita")
            .setDescription("El héroe se diferencia del protagonista habitual de historias isekai por el hecho de que se reencarna en una espada. Comienza su búsqueda apareciendo en medio de un bosque plagado de bestias, y se encuentra con una chica herida que huye frenéticamente por su vida. Al salvarla de sus asaltantes, la pareja se conoce y la chica se presenta como Fran. Tiene un pasado difícil, ya que ha sufrido la esclavitud y el maltrato de su tribu, los Gatos Negros. Como el héroe es incapaz de recordar el nombre de su vida pasada, la joven y tenaz Fran le otorga el nombre de “Shishou” y se convierte en su portadora. A partir de entonces, Shishou y Fran se convierten en un equipo formidable, embarcándose en misiones para liberar a los oprimidos y hacer justicia.")
            .setFields([
                {
                    name: "\u200b",
                    value: "**Información**",
                },
                {
                    name: "Capitulos emitidos",
                    value: "3",
                    inline: true
                },
                {
                    name: "Capitulos previstos",
                    value: "12",
                    inline: true
                },
                {
                    name: "Formato",
                    value: "TV",
                    inline: true
                },
                {
                    name: "Fecha de estreno",
                    value: "20/09/2022",
                    inline: true
                },
                {
                    name: "‎ ",
                    value: "API Olimpic Dragons"
                }
            ])
            .setThumbnail("https://www3.animeflv.net/uploads/animes/covers/3676.jpg")

        const embed2 = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Anime 2")
            .setDescription("Descripción del anime 2");

        const embed3 = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Anime 3")
            .setDescription("Descripción del anime 3");

        const pages = [embed1, embed2, embed3];

        await buttonPages(interaction, pages, "Anime");
    }
}