document.addEventListener('DOMContentLoaded', () => {
    const bubbleHolder = document.querySelector('#chat-container .bubble-holder');
    const backendUrl = 'http://127.0.0.1:8000/chat'; // Assuming default FastAPI port

    function renderBubbles(bubbles) {
        // Clear previous dynamic bubbles
        bubbleHolder.querySelectorAll('.dynamic-bubble').forEach(el => el.remove());

        if (!bubbles || bubbles.length === 0) {
            return;
        }

        bubbles.forEach((bubbleData, index) => {
            const dynamicBubbleContainer = document.createElement('div');
            // Assign classes for structure and animation. Add 'dynamic-bubble' for easy removal.
            // Use a cycling index for some variation based on existing bubble styles (e.g., bubble-4 to bubble-8 are small)
            const styleBaseIndex = 4 + (index % 5); // Cycles through 4, 5, 6, 7, 8
            dynamicBubbleContainer.className = `bubble-${styleBaseIndex} bubble-container bubble-animation-x dynamic-bubble`;

            // Create the inner animated element
            const innerBubble = document.createElement('div');
            innerBubble.className = 'bubble-small bubble-animation-y'; // Assuming all dynamic are small for now
            innerBubble.textContent = bubbleData.text;

            dynamicBubbleContainer.appendChild(innerBubble);

            // Customize position and animation slightly to avoid perfect overlap
            // These are just examples; a more robust layout might be needed.
            dynamicBubbleContainer.style.left = `${(index * 20 + 5) % 70 + 10}%`; // Spread them out a bit
            dynamicBubbleContainer.style.animationDelay = `${(index * 0.3)}s`;
            innerBubble.style.animationDelay = `${(index * 0.2) + 0.5}s`; // Stagger y-animation

            dynamicBubbleContainer.addEventListener('click', () => {
                // No need to display message in chat log anymore
                sendMessageToServer(bubbleData.payload);
            });

            bubbleHolder.appendChild(dynamicBubbleContainer);
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
                // displayMessage(`Error: Could not connect to the server or server returned an error. (Status: ${response.status})`, 'system');
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
            // displayMessage('Error: Failed to communicate with the chat service.', 'system');
            renderBubbles([]); // Clear bubbles on error
        }
    }

    // Initial greeting or prompt
    sendMessageToServer("initial_greeting"); // To get initial bubbles
});
