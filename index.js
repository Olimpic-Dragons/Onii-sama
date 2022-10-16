const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('./config.json');
const animeflv = require('./animeflv.links.json');
const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");

// CREA EL CLIENTE
const client = new Discord.Client({intents: 32767});

// SE EJECUTA CUANDO SE INICIA EL BOT
client.on('ready', () => console.log("Estoy listo"))

// EVENTO QUE ESCUCHA LA EJECUCION DE COMANDOS
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const {commandName} = interaction;
    if (commandName === 'animestoday') {
        imprimirAnimes();
    }
})

// PLANTILLA
client.on("messageCreate", async (message) => {
    if (message.content.startsWith(`!page`)) {
        let embeds = [
            new MessageEmbed().setTitle(`embeds 1`),
            new MessageEmbed().setTitle(`embeds 2`),
            new MessageEmbed().setTitle(`embeds 3`),
            new MessageEmbed().setTitle(`embeds 4`),
            new MessageEmbed().setTitle(`embeds 5`),
            new MessageEmbed().setTitle(`embeds 6`),
        ];
        await pagination(message, embeds)
    }
})

client.login(config.BOT_TOKEN)

/**
 *
 * @param {CommandInteraction} interaction
 * @param {Array} embeds
 * */
async function pagination(interaction, embeds) {
    let allbuttons = new MessageActionRow().addComponents([
        new MessageButton().setStyle('SECONDARY').setCustomId('0').setLabel('<<'),
        new MessageButton().setStyle('SECONDARY').setCustomId('1').setLabel('<'),
        new MessageButton().setStyle('SECONDARY').setCustomId('2').setLabel('X'),
        new MessageButton().setStyle('SECONDARY').setCustomId('3').setLabel('>'),
        new MessageButton().setStyle('SECONDARY').setCustomId('4').setLabel('>>')
    ]);
    // send message if embeds is 1
    if (embeds.length == 1) {
        if (interaction.deferred) {
            return interaction.followUp({
                embeds: [embeds[0]],
            });
        } else {
            return interaction.reply({
                embeds: [embeds[0]],
            });
        }
    }

    embeds = embeds.map((embed, index) => {
        return embed.setFooter({
            text: `Page ${index + 1}/${embeds.length}`,
            iconURL: interaction.guild.iconURL({dynamic: true}),
        });
    });

    let sendMsg;
    if (interaction.deferred) {
        sendMsg = await interaction.followUp({
            embeds: [embeds[0]],
            components: [allbuttons]
        });
    } else {
        sendMsg = await interaction.reply({
            embeds: [embeds[0]],
            components: [allbuttons]
        });
    }
    let filter = (m) => m.member.id === interaction.member.id;

    const collector = await sendMsg.createMessageComponentCollector({
        filter: filter,
        time: 3000,
    });

    let currentPage = 0;
    collector.on('collect', async (b) => {
        if (b.isButton()) {
            await b.deferUpdate().catch(e => null)
            // page first
            switch (b.customId) {
                case "0": {
                    if (currentPage != 0) {
                        currentPage = 0;
                        await sendMsg.edit({
                            embeds: [embeds[currentPage]],
                            comptents: [allbuttons]
                        }).catch((e) => null);
                    }
                } break;
                case "1": {
                    if (currentPage !== 0) {
                        currentPage -= 1;
                        await sendMsg.edit({
                            embeds: [embeds[currentPage]],
                            comptents: [allbuttons]
                        }).catch((e) => null);
                    } else {
                        currentPage = embeds.length -1;
                        await sendMsg.edit({
                            embeds: [embeds[currentPage]],
                            comptents: [allbuttons]
                        }).catch((e) => null);
                    }
                } break;
                case "2": {
                    allbuttons.components.forEach((btn) => btn.setDisabled(true));
                    await sendMsg.edit({
                        embeds: [embeds[currentPage]],
                        comptents: [allbuttons]
                    }).catch((e) => null);
                } break;
                case "3": {
                    if (currentPage < embeds.length - 1) {
                        currentPage++;
                        await sendMsg.edit({
                            embeds: [embeds[currentPage]],
                            comptents: [allbuttons]
                        }).catch((e) => null);
                    } else {
                        currentPage = 0;
                        await sendMsg.edit({
                            embeds: [embeds[currentPage]],
                            comptents: [allbuttons]
                        }).catch((e) => null);
                    }
                } break;
                case "4": {
                    currentPage = embeds.length - 1;
                    await sendMsg.edit({
                        embeds: [embeds[currentPage]],
                        comptents: [allbuttons]
                    }).catch((e) => null);
                } break;

                default:
                    break;
            }

        }
    });

    collector.on('end', async () => {
        allbuttons.components.forEach((btn) => btn.setDisabled(true));
        await sendMsg.edit({
            embeds: [embeds[currentPage]],
            comptents: [allbuttons]
        }).catch(e => null);
    })
}


function imprimirAnimes() {
    // RECOGER DIA ACTUAL
    let dia = new Date().getDay();
    let diaString;

    // ALMACENAR EL STRING DEL DIA EN LA VARIABLE diaString
    switch (dia) {
        case 1:
            diaString = "monday";
            break;
        case 2:
            diaString = "tuesday";
            break;
        case 3:
            diaString = "wednesday";
            break;
        case 4:
            diaString = "thursday";
            break;
        case 5:
            diaString = "friday";
            break;
        case 6:
            diaString = "saturday";
            break;
        case 0:
            diaString = "sunday";
            break;
    }

    // GUARDAR CANAL DE TEXTO EN UNA CONSTANTE
    channel = client.channels.cache.get('989097992533454858');

    // HTTP REQUEST A LA API
    // DOCUMENTACION: https://docs.api.jikan.moe/
    fetch("https://api.jikan.moe/v4/schedules/" + diaString)
        .then(response => response.json())
        .then(datos => datos.data)
        .then(animes => {
            animes.forEach(element => {
                let hora = element['broadcast']['time']
                if (hora == null) {
                    hora = "no anunciado";
                }

                // MENSAJE EMBEBIDO
                const mensajeEmbedido = new Discord.MessageEmbed()
                    .setTitle(element['title'])
                    .setURL(element['url'])
                    .setThumbnail(element['images']['jpg']['image_url'])
                    .addField("Hora de emisión: ", hora, true)

                // ENVIAR MENSAJE EN EL CANAL
                channel.send({
                    embeds: [mensajeEmbedido]
                }).then(console.log).catch(console.error)
            });
        })
}