import os
import pandas as pd
import discord
import openai
import datetime

from Heidi.__testing__.message_processor import load_message_history, save_message_history, process_message

# Set up the OpenAI API client
openai.api_key = "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"

# Set up the Discord bot client
intents = discord.Intents.default()
intents.members = True  # Add this line to enable member intents
client = discord.Client(intents=intents)

# Create a dictionary to store message history for each channel
channel_message_histories = load_message_history()


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
        model="gpt-3.5-turbo",
        max_tokens=150,
        messages=channel_message_histories[channel_id]
    )

    # Extract the response text
    response_text = process_message(message, channel_message_histories)
    # Add the assistant's response to the message history
    channel_message_histories[channel_id].append({"role": "assistant", "content": response_text})

    # Send the response back to the user
    await message.channel.send(response_text)

done = True

# Register the on_message function
client.event(on_message)

# Connect the bot to the Discord API
client.run("OTkwMzUxMjk0MjkwMDkyMDkz.GddPD4.NLOQNbHHsXOZ-fmdx7mZOrm8bcvralHwaKrbXE")
print(channel_message_histories)
