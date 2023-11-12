import activate_discord
import os
import responses
from neuralintents import GenericAssistant

chatbot = GenericAssistant('Heidi/Discord/intents.json')
chatbot.train_model()
chatbot.save_model()

client = activate_discord.Client()

TOKEN ='OTkwMzUxMjk0MjkwMDkyMDkz.GNzpal.ByQ4dLxN0QrOSzSYy1XZu_NNkqtZ4CsUfCnesI'

# Activation sequence
def activate_heidi():
    intents = activate_discord.Intents.default()
    intents.message_content = True
    client = activate_discord.Client(intents=intents)

    @client.event
    async def on_ready():
        print(f'{client.user} is Online')    

    @client.event
    async def send_message(message):
        if message.author == client.user:
           return

        username = str(message.author)
        user_message = str(message.content)
        channel = str(message.channel)

        print(f'{username} said: "{user_message}" ({channel})')

        if user_message[0] == '?':
            user_message = user_message[1:]
            await send_message(message, user_message, is_private=True)
        else:
            await send_message(message, user_message, is_private=False)

@client.event
async def send_message(message, usermessage, is_private):
    if message.autho == client.user:
        return

    if message.content.startswith("@Heidi"):
        response = chatbot.request(message.content[7:])
        await message.channel.send(response)

    client.run(TOKEN)

    try:
        response = responses.get_response(message)
        await message.author.send(response) if is_private else await message.channel.send(response)

    except Exception as e:
        print(e)
