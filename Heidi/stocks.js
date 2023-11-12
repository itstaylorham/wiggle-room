const Discord = require('discord.js');
const fetch = require('node-fetch');

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.DirectMessages
    ]
});
const CHANNEL_ID = '1118524675228696626';

client.on('ready', () => {
  console.log(`Heidi is listening to stocks endpoint. ${client.user.tag}`);
  client.user.setActivity("WiggleHQ", { type: "LISTENING" }); // Set the bot's activity
});

async function postArticle() {
    const channel = await client.channels.fetch(CHANNEL_ID);
    try {
        let response = await fetch('http://localhost:5000/stock-1');
        let item = await response.json();

        channel.send(item.link);
        console.log(`Posted ${item.title}`);

    } catch (error) {
        console.log(`Error fetching stocks from endpoint1: ${error}`);
    }
}

client.once('ready', () => {
    console.log('#stocks is live!');

    postArticle();  // Post the article immediately

    setInterval(postArticle, 1000 * 60 * 60 * 3);  // Then post every 6 hours
});

client.login('OTkwMzUxMjk0MjkwMDkyMDkz.GddPD4.NLOQNbHHsXOZ-fmdx7mZOrm8bcvralHwaKrbXE');
