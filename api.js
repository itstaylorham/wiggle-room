const axios = require('axios');
const express = require('express');
const Parser = require('rss-parser');
const parser = new Parser();

const app = express();

// WiggleHQ News Feed
app.get('/news-1', async (req, res) => {
    try {
        let feed = await parser.parseURL('http://feeds.feedburner.com/ign/games-all');
        let item = feed.items[4]; // get the first four items

        res.json({
            title: item.title,
            link: item.link,
            contentSnippet: item.contentSnippet
        });
    } catch (error) {
        console.log(`Error fetching IGN news: ${error}`);
        res.status(500).send('Error fetching IGN news');
    }
});

app.get('/news-2', async (req, res) => {
    try {
        let feed = await parser.parseURL('http://feeds.feedburner.com/gamespot/mashup');
        let item = feed.items[4]; // get the first four items

        res.json({
            title: item.title,
            link: item.link,
            contentSnippet: item.contentSnippet
        });
    } catch (error) {
        console.log(`Error fetching IGN news: ${error}`);
        res.status(500).send('Error fetching IGN news');
    }
});

app.get('/stock-1', async (req, res) => {
    try {
        let feed = await parser.parseURL('https://finance.yahoo.com/news/rssindex');
        let item = feed.items[4]; // get the first four items

        res.json({
            title: item.title,
            link: item.link,
            contentSnippet: item.contentSnippet
        });
    } catch (error) {
        console.log(`Error fetching IGN news: ${error}`);
        res.status(500).send('Error fetching IGN news');
    }
});

app.get('/endpoint2b', async (req, res) => {
    try {
        let feed = await parser.parseURL('http://feeds.feedburner.com/gamespot/mashup');
        let item = feed.items[4]; // get the first four items

        res.json({
            title: item.title,
            link: item.link,
            contentSnippet: item.contentSnippet
        });
    } catch (error) {
        console.log(`Error fetching IGN news: ${error}`);
        res.status(500).send('Error fetching IGN news');
    }
});

// Agrotech Sensor Data
app.get('/endpoint2', async (req, res) => {
    try {
        let response = await axios.get('http://192.168.68.118:3000/api/sensor_data');
        let sensor_data = response.data;
        
        // Modify the sensor data if necessary

        // send it as a response
        res.json(sensor_data);
    } catch (error) {
        console.log(`Error fetching sensor data: ${error}`);
        res.status(500).send('Error fetching sensor data');
    }
});

// Stock Market Data
app.get('/endpoint3', async (req, res) => {
    try {
        let response = await axios.get('http://');
        let sensor_data = response.data;

        // send it as a response
        res.json(sensor_data);
    } catch (error) {
        console.log(`Error fetching stock market data: ${error}`);
        res.status(500).send('Error fetching sensor data');
    }
});

// Stock Market Data
app.get('/endpoint3', async (req, res) => {
    try {
        let response = await axios.get('http://');
        let sensor_data = response.data;

        // send it as a response
        res.json(sensor_data);
    } catch (error) {
        console.log(`Error fetching stock market data: ${error}`);
        res.status(500).send('Error fetching sensor data');
    }
});

app.get('/run-model', (req, res) => {
    try {
        const pythonProcess = spawn("python3", ["/path/to/your/model/script.py"]);

        pythonProcess.on('close', (code) => {
            if(code === 0) {
                console.log('Model script executed successfully.');
            } else {
                console.log('There was an error executing the model script.');
            }
        });

        res.status(200).send('Model script is running!');
    } catch (error) {
        console.error(`Error executing model script: ${error}`);
        res.status(500).send('Error executing model script');
    }
});

app.listen(5000, () => {
    console.log('App listening on port 5000');
});
