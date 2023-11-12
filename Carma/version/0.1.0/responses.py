import random

def get_response(message: str) -> str:
    p_message = message.lower()

    if p_message == 'hello':
        return 'Hi. What can I do for you?'

    if p_message == 'rand':
        return str(random.randrange(0, 1000))

    if p_message == 'roll':
        return str(random.randint(1, 6))

    if p_message.startswith("rand between "):
        try:
            parts = p_message.split(" ")
            a = int(parts[2])
            b = int(parts[4])
            return str(random.randrange(a, b))
        except (ValueError, IndexError):
            return 'Invalid. Usage: `rand between NUM1 NUM2`'
        
#    if p_message.startswith("rand between"):
#        try:
#            num1 = input("Enter the first number: ")
#            num2 = input("Enter the second number: ")
#            a = int(num1)
#            b = int(num2)
#            if a > b:
#                a, b = b, a
#            return str(random.randrange(a, b + 1))
#        except ValueError:
#            return "Invalid input. Both values must be integers."

    if p_message == '!help':
        return '`Heidi NLP v0.1.0`'

    return 'Sorry, I didn\'t understand what you wrote.'
