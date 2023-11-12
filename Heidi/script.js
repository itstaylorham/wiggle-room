async function sendMessage() {
    // Get user input
    const userInput = document.getElementById('user-input').value;

    // Display user's message
    displayMessage('User: ' + userInput, 'user');

    // Call GPT-4 API 
    const response = await fetch('https://api.example.com/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput })
    });
    const data = await response.json();

    // Display GPT-4's response
    displayMessage('GPT-4: ' + data.response, 'bot');

    // Clear the user input
    document.getElementById('user-input').value = '';
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender;
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom to show latest messages
}
