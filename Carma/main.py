import os
import pandas as pd
import json
import discord
import openai
import datetime

# Set up the OpenAI API client
openai.api_key = "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"

# Set up the Discord bot client
intents = discord.Intents.default()
intents.members = True  # Add this line to enable member intents
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print("Completed.")
    print("Carma is running!")

# Create a dictionary to store message history for each channel
channel_message_histories = {}

async def on_message(message):
    if message.author == client.user or client.user not in message.mentions:
        return

    channel_id = message.channel.id

    # Initialize message history for the channel if it doesn't exist
    if channel_id not in channel_message_histories:
        channel_message_histories[channel_id] = [
            {"role": "system", "content": "Your name is Carma. Carma is an assistant secretary at the Wiggle Room. At the Wiggle Room, you report to Heidi. You have a sarcastic tone most of the time, ridiculous and disrespectful questions will also be followed up by Carma with sarcastic responses. Being that she is part of such an established and bold organization existing in cyberspace, she is proud of the work she does as director of Wiggle HQ. She gets excited when talking about Wiggle HQ projects."},
            {"role": "assistant", "content": "OK"}
        ]

    # Add the user's message to the message history
    channel_message_histories[channel_id].append({"role": "user", "content": message.content})

    # Get a response from the ChatGPT API
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        max_tokens=90,
        temperature=0.9,
        messages=channel_message_histories[channel_id]
    )

    # Extract the response text
    response_text = response.choices[0].message.content

    # Add the assistant's response to the message history
    channel_message_histories[channel_id].append({"role": "assistant", "content": response_text})

    # Save the message history to a JSON file
    timestamp = datetime.datetime.now().strftime("%d-%m-%Y-%H%M%S")
    filename = f"/home/jeremy/Documents/WiggleHQ/Carma/__memory__/{timestamp}-channel-{channel_id}.json"
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, 'w') as f:
        json.dump(channel_message_histories[channel_id], f, indent=4)

    # Send the response back to the user
    await message.channel.send(response_text)

    # Show updated message history
    # print(channel_message_histories)
done = True

# Register the on_message function
client.event(on_message)
print("Initalizing Carma...")
# Connect the bot to the Discord API
client.run("MTA0MDgzNTgzNjY5MTg3NzkwOA.G564nR.7LDy5fVyHVMQ56u3LxoBnzZoI8L77IerbQMT5g")

from flask import Flask, jsonify

app = Flask(__name__)

import requests

# Make a GET request to the sensor data endpoint
response = requests.get('http://localhost:3000/api/sensor_data')

# Get the sensor data from the response
sensor_data = response.json()





