const Discord = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const { spawn } = require("child_process");
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const BOT_TOKEN = 'MTA0MDgzNTgzNjY5MTg3NzkwOA.G564nR.7LDy5fVyHVMQ56u3LxoBnzZoI8L77IerbQMT5g'; // Replace with your bot token
const CHANNEL_ID = '1097384129982648332'; // Replace with your channel ID
const { detectTrend, /*manipulateData*/} = require('./trends.js');

client.on('ready', () => {
  console.log(`Carma is listening to Agrotech API ${client.user.tag}`);
  client.user.setActivity("agrotech", { type: "LISTENING" }); // Set the bot activity
  sendSensorDataLoop();
});

async function sendSensorData() {
  console.log('Collecting sensor data...');
  const response = await axios.get('http://192.168.68.114:3000/api/sensor_data');  
  
  const sensor_data = response.data;

  const sorted_data = sensor_data.sort((a, b) => b.Timestamp - a.Timestamp);
  const latest_row = sorted_data[0];

  const fields = {
    Timestamp: 'TS',
    Light: 'L',
    Moisture: 'M',
    Conductivity: 'C',
    Temperature: 'T',
  };

  let r2_scores;
  try {
    
      r2_scores = JSON.parse(fs.readFileSync('/home/jeremy/Documents/AGT/__files__/metrics/r2_scores.json', 'utf8'));
  } catch (err) {
      console.error('Failed to read R2 scores file:', err);
      return;
  }

  let health_score = 0;
  const r2_keys = Object.keys(r2_scores);
  for (const key of r2_keys) {
      const r2 = Math.max(r2_scores[key], 0);  // Ensure the score is not negative
      health_score += r2 * 100;  // Scale to 0-100
  }
  health_score /= r2_keys.length;  // Average the scores

  // The message_parts array will hold each segment of the message.
  const message_parts = [];

  // Start with the health score
  message_parts.push(`HS: ${health_score.toFixed(2)}`); 

  // Loop through each field and add it to the message_parts array.
  for (const [field, label] of Object.entries(fields)) {
    let value = latest_row[field] || 'N/A';
    if (field === 'Timestamp') {
      const timestampForData = new Date(); // Get the current date and time
      value = timestampForData.toISOString().replace('T', ' ').substring(0, 19);
    }

    // Append a pipe before each field except the first one (health score)
    const separator = message_parts.length > 0 ? " | " : "";
    
    // Push this segment to the message_parts array.
    message_parts.push(`${separator}${label}: ${value}`);
  }

  // Join all the message parts into a single string.
  const message = message_parts.join('');

  let rawdata = fs.readFileSync('/home/jeremy/Documents/AGT/sesh.json');
  let sensorData = JSON.parse(rawdata);
  let temperatureData = sensorData.map(obj => obj.Temperature[0]);

  // manipulateData();
  const trendDetected = await detectTrend(temperatureData);

    // Send the message
    const channel = await client.channels.fetch(CHANNEL_ID);
  
    if (trendDetected) {
      // Send initial message indicating a trend was detected.
    await channel.send("Ongoing trend detected.");

    // Build an image from the data 
    const python = spawn('python3', ['/home/jeremy/Documents/AGT/backend/graph_api.py']);

    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
    });

      // Download the image from the server
      const imageResponse = await axios.get('http://192.168.68.114:3000/api/graph_data', { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(imageResponse.data, 'binary');
  
      // Get the current date and time
      const timestampForFile = new Date();
  
      // Format the timestampForData as "YYYY-MM-DD-HH-mm"
      const formattedTimestamp = `${timestampForFile.getFullYear()}-${String(timestampForFile.getMonth() + 1).padStart(2, '0')}-${String(timestampForFile.getDate()).padStart(2, '0')}-${String(timestampForFile.getHours()).padStart(2, '0')}-${String(timestampForFile.getMinutes()).padStart(2, '0')}`;
  
      // Append the formatted timestampForData to the filename
      const filename = `sensor-data_${formattedTimestamp}.png`;
  
      // Create a Discord MessageAttachment with the image and the generated filename
      const attachment = new Discord.MessageAttachment(imageBuffer, filename);
  
      // Send the message with the attachment
      await channel.send({ content: message, files: [attachment] });
    } else {
      // Send the message without an attachment
      await channel.send(message);
    }
  
    const timestampForLog = new Date(); // Get the current date and time for logging
    const formatTimestamp = timestampForLog.toISOString();
    console.log(`Sensor data processed on ${formatTimestamp}.`);
    console.log(`Health score: ${health_score.toFixed(2)}`);
  }

function sendSensorDataLoop() {
  sendSensorData();
  setTimeout(sendSensorDataLoop, 20 * 60 * 1000); // 20 minutes
}

client.login(BOT_TOKEN);
