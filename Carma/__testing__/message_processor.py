import json
import os
import openai

def load_message_history():
    """
    Load the message history from a file, if it exists.
    """
    message_history = {}
    if os.path.exists("__memory__/message_history.json"):
        with open("__memory__/message_history.json", "r") as f:
            message_history = json.load(f)
    return message_history

def save_message_history(message_history):
    """
    Save the message history to a file.
    """
    with open("__memory__/message_history.json", "w") as f:
        json.dump(message_history, f)

def add_message_to_history(message, message_history):
    """
    Add a message to the message history.
    """
    channel_id = message.channel.id

    # Initialize message history for the channel if it doesn't exist
    if channel_id not in message_history:
        message_history[channel_id] = [
            {"role": "system", "content": "Your name is Heidi. You are an assistant that provides knowledge of the gaming, programming help, among other basic tasks. If you are unsure of a user's question, you ask the user to clarify."},
            {"role": "assistant", "content": "OK"}
        ]

    # Add the user's message to the message history
    message_history[channel_id].append({"role": "user", "content": message.content})

def get_response_from_openai(message_history):
    """
    Get a response from the OpenAI API.
    """
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt= "\n".join([message["content"] for message in message_history[-3:]]),
        temperature=0.7,
        max_tokens=150,
        n=1,
        stop=None,
    )
    response_text = response.choices[0].text
    return response_text

def add_response_to_history(response_text, message_history):
    """
    Add the assistant's response to the message history.
    """
    channel_id = message.channel.id
    message_history[channel_id].append({"role": "assistant", "content": response_text})

def process_message(message, message_history):
    """
    Process a message and return a response.
    """
    # Add the message to the message history
    add_message_to_history(message, message_history)

    # Get a response from the OpenAI API
    response_text = get_response_from_openai(message_history)

    # Add the response to the message history
    add_response_to_history(response_text, message_history)

    # Save the message history to a file
    save_message_history(message_history)

    # Return the response
    return response_text
