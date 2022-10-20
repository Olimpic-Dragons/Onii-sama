const {
    MessageActionRow,
    MessageButton
} = require("discord.js");

async function buttonPages(interaction, pages, tipo, time = 60000) {
    // errors
    if (!interaction) throw new Error("Proporcione un argumento de interacción.");
    if (!pages) throw new Error("Proporcione un argumento de página.");
    if (!Array.isArray(pages)) throw new Error("pages must be an array");

    if (typeof time !== "number") throw new Error("Time debe ser un número.");
    if (parseInt(time) < 30000) {
        throw new Error("Time tiene que ser mayor de 30 Segundos");
    }

    // defer reply
    await interaction.deferReply();

    // no buttons if there is only one page
    if (pages.length === 1) {
        return await interaction.editReply({
            embeds: pages,
            components: [],
            fetchReply: true,
        });
    }

    // adding buttons
    const prev = new MessageButton()
        .setCustomId("prev")
        .setEmoji("◀️")
        .setStyle("PRIMARY")
        .setDisabled(true);

    const home = new MessageButton()
        .setCustomId("home")
        .setEmoji("🏠")
        .setStyle("DANGER")
        .setDisabled(true);

    const next = new MessageButton()
        .setCustomId("next")
        .setEmoji("▶️")
        .setStyle("PRIMARY");

    const buttonRow = new MessageActionRow().addComponents(prev, home, next);
    let index = 0;

    const currentPage = await interaction.editReply({
        embeds: [pages[index].setFooter({ text: `${tipo} ${index + 1} / ${pages.length}` })],
        components: [buttonRow],
        fetchReply: true,
    });

    // creating the collector
    const collector = await currentPage.createMessageComponentCollector({
        componentType: "BUTTON",
        time,
    });

    collector.on("collect", async (i) => {
        if (i.user.id !== interaction.user.id) {
            return i.reply({
                content: "No puedes usar ese botón",
                ephemeral: true,
            });
        }

        await i.deferUpdate();

        if (i.customId === "prev") {
            if (index > 0) {
                index--;
            }
        } else if (i.customId === "home") {
            index = 0;
        } else if (i.customId === "next") {
            if (index < pages.length -1) {
                index++;
            }
        }

        if (index === 0) {
            prev.setDisabled(true);
            home.setDisabled(true);
        } else {
            prev.setDisabled(false);
            home.setDisabled(false);
        }

        if (index === pages.length - 1) {
            next.setDisabled(true);
        } else {
            next.setDisabled(false);
        }

        await currentPage.edit({
            embeds: [pages[index].setFooter({ text: `${tipo} ${index + 1} / ${pages.length}` })],
            components: [buttonRow],
        });

        collector.resetTimer();
    })

    // ending the collector
    collector.on("end", async (i) => {
        await currentPage.edit({
            embeds: [pages[index]],
            collector: [],
        });
    });
    return currentPage;

}

module.exports = buttonPages;