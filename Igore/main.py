import discord
import json
from discord.ext import commands
import subprocess

# Set the intents that the bot needs
intents = discord.Intents.default()
intents.guilds = True

# Create a bot instance
bot = commands.Bot(command_prefix='/', intents=intents)

TOKEN = "discord bot token"  # Make sure to replace this with your actual token
CLIENT_ID = "1113235056861925416"  # Replace with your client ID

# Define the bot's commands using a decorator
@bot.command()
async def ping(ctx):
    await ctx.send('Pong!')

@bot.command()
async def agt_src_top(ctx):
    try:
        with open('/home/jeremy/Documents/AGT/sesh.json', 'r') as file:
            records = json.load(file)
        last_record = records[-1]
        await ctx.send(f'The latest record is: {json.dumps(last_record)}')
    except Exception as e:
        await ctx.send('An error occurred while reading the source file.')
        print(e)

@bot.command()
async def agt_train(ctx):
    try:
        # Execute the Python file
        process = subprocess.Popen(["python3", "/home/jeremy/Documents/AGT/__tools__/neural_net/modular/model.py"],
                                   stdout=subprocess.PIPE,
                                   stderr=subprocess.PIPE)
        stdout, stderr = process.communicate()

        if process.returncode == 0:
            await ctx.send('The model has been trained successfully!')
        else:
            await ctx.send('There was an error training the model. Please check the logs.')
            print(stderr.decode())

    except Exception as e:
        await ctx.send('There was an error initiating the training. Please check the logs.')
        print(e)

@bot.command()
async def stonk(ctx, symbol: str):
    # Here you will need to implement the functionality of 'stonks.js' in Python.
    pass  # Replace this with the actual implementation

@bot.command()
async def sendgen(ctx, *, message: str):
    general_channel_id = '990041433878724640'
    general_channel = bot.get_channel(int(general_channel_id))

    if general_channel:
        await general_channel.send(f'Message from {ctx.author.name}: {message}')
        await ctx.send('Message sent!')
    else:
        await ctx.send(f'No channel found with the id {general_channel_id}.')

# Event listener for when the bot has connected to the server
@bot.event
async def on_ready():
    print(f'{bot.user.name} has connected to Discord!')
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.listening, name="(/) commands"))

# Run the bot with the token
bot.run(TOKEN)
