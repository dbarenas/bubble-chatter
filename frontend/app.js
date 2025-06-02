document.addEventListener('DOMContentLoaded', () => {
    const chatLog = document.getElementById('chat-log');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const bubbleContainer = document.getElementById('bubble-container');

    const backendUrl = 'http://127.0.0.1:8000/chat'; // Assuming default FastAPI port

    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'system-message');
        messageDiv.textContent = message;
        chatLog.appendChild(messageDiv);
        chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
    }

    function renderBubbles(bubbles) {
        // Clear previous bubbles
        d3.select(bubbleContainer).selectAll('*').remove();

        if (!bubbles || bubbles.length === 0) {
            return;
        }

        // Render new bubbles
        d3.select(bubbleContainer)
            .selectAll('div.bubble')
            .data(bubbles)
            .join('div')
            .attr('class', 'bubble')
            .text(d => d.text)
            .on('click', (event, d) => {
                displayMessage(d.text, 'user'); // Show bubble text as user message
                sendMessageToServer(d.payload);
            });
    }

    async function sendMessageToServer(messageText) {
        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: messageText }),
            });

            if (!response.ok) {
                console.error('Error from server:', response.status, await response.text());
                displayMessage(`Error: Could not connect to the server or server returned an error. (Status: ${response.status})`, 'system');
                renderBubbles([]); // Clear bubbles on error
                return;
            }

            const data = await response.json();
            if (data.bubbles) {
                renderBubbles(data.bubbles);
            } else {
                renderBubbles([]);
            }
        } catch (error) {
            console.error('Failed to send message or parse response:', error);
            displayMessage('Error: Failed to communicate with the chat service.', 'system');
            renderBubbles([]); // Clear bubbles on error
        }
    }

    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            displayMessage(message, 'user');
            sendMessageToServer(message);
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    // Initial greeting or prompt (optional)
    // displayMessage("Hello! How can I help you today?", "system");
    // sendMessageToServer("initial_greeting"); // To get initial bubbles
});
