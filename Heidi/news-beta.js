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
const ARTICLE_CHECK_INTERVAL = 10000; // 10 seconds

let lastArticleIds = {
    endpoint1: null,
    endpoint1a: null
};

client.on('ready', () => {
    console.log(`Heidi is listening to news endpoints. ${client.user.tag}`);
    client.user.setActivity("WiggleHQ", { type: "LISTENING" }); // Set the bot's activity
    setInterval(checkAndPostArticles, ARTICLE_CHECK_INTERVAL);
});

async function fetchArticle(endpoint) {
    try {
        const response = await fetch(endpoint);
        const item = await response.json();
        return item;
    } catch (error) {
        console.log(`Error fetching news from ${endpoint}: ${error}`);
        return null;
    }
}

async function checkAndPostArticles() {
    const channel = await client.channels.fetch(CHANNEL_ID);

    // Check endpoint1
    const article1 = await fetchArticle('http://localhost:5000/endpoint1');
    if (article1 && article1.id !== lastArticleIds.endpoint1) {
        channel.send(article1.link);
        console.log(`Posted ${article1.title} from endpoint1`);
        lastArticleIds.endpoint1 = article1.id;
    }

    // Check endpoint1a
    const article1a = await fetchArticle('http://localhost:5000/endpoint1a');
    if (article1a && article1a.id !== lastArticleIds.endpoint1a) {
        channel.send(article1a.link);
        console.log(`Posted ${article1a.title} from endpoint1a`);
        lastArticleIds.endpoint1a = article1a.id;
    }
}

client.login('OTkwMzUxMjk0MjkwMDkyMDkz.GddPD4.NLOQNbHHsXOZ-fmdx7mZOrm8bcvralHwaKrbXE');
