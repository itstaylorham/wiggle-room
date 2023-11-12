const Discord = require('discord.js');
const fetch = require('node-fetch');

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.DirectMessages
    ]
});
const CHANNEL_ID = '1097384037380804698';

const RSS_FEEDS = [
    'http://localhost:5000/news-1',
  //  'http://localhost:5000/news-2',
  //  'http://localhost:5000/endpoint3'
];

client.on('ready', () => {
  console.log(`Heidi is listening to news endpoint. ${client.user.tag}`);
  client.user.setActivity("WiggleHQ", { type: "LISTENING" }); // Set the bot's activity
});

async function postArticle() {
    const channel = await client.channels.fetch(CHANNEL_ID);
    for (const rssFeed of RSS_FEEDS) {
        try {
            let response = await fetch(rssFeed);
            let item = await response.json();

            if (item) {
                channel.send(item.link);
                console.log(`Posted ${item.title}`);
            }
        } catch (error) {
            console.log(`Error fetching news from ${rssFeed}: ${error}`);
        }
    }           
}

client.once('ready', () => {
    console.log('#News is live!');

    postArticle();  // Post the article immediately

    setInterval(postArticle, 1000 * 60 * 60 * 6);  // Then post every 6 hours
});

client.login('OTkwMzUxMjk0MjkwMDkyMDkz.GddPD4.NLOQNbHHsXOZ-fmdx7mZOrm8bcvralHwaKrbXE');
