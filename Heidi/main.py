import os
import pandas as pd
import json
import discord
import openai
import datetime

# Set up the OpenAI API client
openai.api_key = ""

# Set up the Discord bot client
intents = discord.Intents.default()
intents.members = True  # Add this line to enable member intents
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print("Completed.")
    print("Heidi is running!")
    await client.change_presence(activity=discord.Activity(type=discord.ActivityType.listening, name="everyone"))


# Create a dictionary to store message history for each channel
channel_message_histories = {}

# Create a dictionary to store message history for each channel
channel_message_histories = {}

import os
import json
import datetime

async def on_message(message):
    if message.author == client.user or client.user not in message.mentions:
        return

    channel_id = message.channel.id

    # Initialize message history for the channel if it doesn't exist
    if channel_id not in channel_message_histories:
        channel_message_histories[channel_id] = [
            {"role": "system", "content": "Your name is Heidi. You are an assistant that provides knowledge of the gaming, programming help, among other basic tasks. If you are unsure of a user's question, you ask the user to clarify."},
            {"role": "assistant", "content": "OK"}
        ]

    # Add the user's message to the message history
    channel_message_histories[channel_id].append({"role": "user", "content": message.content})

    # Get a response from the ChatGPT API
    response = openai.ChatCompletion.create(
        model="gpt-4",
        max_tokens=1000,
        messages=channel_message_histories[channel_id]
    )

    # Extract the response text
    response_text = response.choices[0].message.content

    # Add the assistant's response to the message history
    channel_message_histories[channel_id].append({"role": "assistant", "content": response_text})

    # Save the message history to a JSON file
    timestamp = datetime.datetime.now().strftime("%d-%m-%Y-%H%M%S")
    filename = f"/home/jeremy/Documents/WiggleHQ/Heidi/__memory__/{timestamp}-channel-{channel_id}.json"
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
print("Initalizing Heidi...")
# Connect the bot to the Discord API
client.run("Bot-token")
print("Completed!")

