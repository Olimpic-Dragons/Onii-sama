const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('./config.json');
const animeflv = require('./animeflv.links.json');


const client = new Discord.Client({ intents: 32767 });

client.on('ready', () => console.log("Estoy listo"))

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'animestoday') {
        imprimirAnimes();
    }

    function imprimirAnimes() {
        let dia = new Date().getDay();
        let diaString;
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
        channel = client.channels.cache.get('989097992533454858');
        fetch("https://api.jikan.moe/v4/schedules/"+diaString)
            .then(response => response.json())
            .then(datos => datos.data)
            .then(animes => {
                animes.forEach(element => {
                    let hora = element['broadcast']['time']
                    if (hora == null) {
                        hora = "no anunciado";
                    }
                    const mensajeEmbedido = new Discord.MessageEmbed()
                        .setTitle(element['title'])
                        .setURL(element['url'])
                        .setThumbnail(element['images']['jpg']['image_url'])
                        .addField("Hora de emisión: ", hora, true)
                    channel.send({
                        embeds: [mensajeEmbedido]
                    }).then(console.log).catch(console.error)
                });
            })
    }
})

client.on("message", (message) => {
    if(message.content.startsWith("eo")){

    }
})

client.login(config.BOT_TOKEN)