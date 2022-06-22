const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('./config.json');
const animeflv = require('./animeflv.links.json');

// CREA EL CLIENTE
const client = new Discord.Client({ intents: 32767 });

// SE EJECUTA CUANDO SE INICIA EL BOT
client.on('ready', () => console.log("Estoy listo"))

// EVENTO QUE ESCUCHA LA EJECUCION DE COMANDOS
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    if (commandName === 'animestoday') {
        imprimirAnimes();
    }
})

// PLANTILLA
client.on("message", (message) => {
    if(message.content.startsWith("eo")){}
})

client.login(config.BOT_TOKEN)

function imprimirAnimes() {
    // RECOGER DIA ACTUAL
    let dia = new Date().getDay();
    let diaString;

    // ALMACENAR EL STRING DEL DIA EN LA VARIABLE diaString
    switch (dia){
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
    fetch("https://api.jikan.moe/v4/schedules/"+diaString)
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