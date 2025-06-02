document.addEventListener('DOMContentLoaded', () => {
    const bubbleHolder = document.querySelector('#chat-container .bubble-holder');
    const backendUrl = 'http://127.0.0.1:8000/chat'; // Assuming default FastAPI port

    const newsBackendUrl = 'http://127.0.0.1:8000/api/news_stream'; // New backend URL
    let allNewsItems = []; // To store all 1000 news items
    let currentNewsIndex = 0; // To keep track of which news to display next
    const NEWS_FETCH_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds
    const NEWS_DISPLAY_INTERVAL = 30 * 1000; // 30 seconds in milliseconds
    const NEWS_ITEMS_PER_BATCH = 10; // Number of news items to display each time

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

    async function fetchNews() {
        console.log("Fetching news...");
        try {
            const response = await fetch(newsBackendUrl);
            if (!response.ok) {
                console.error('Error fetching news:', response.status, await response.text());
                // Potentially display an error to the user, but for now, just log.
                return;
            }
            const data = await response.json();
            allNewsItems = data; // Store all fetched news items
            currentNewsIndex = 0; // Reset index when new news is fetched
            console.log(`Fetched ${allNewsItems.length} news items.`);
            displayNewsBubbles(); // Display immediately after fetch
        } catch (error) {
            console.error('Failed to fetch or parse news:', error);
        }
    }

    function displayNewsBubbles() {
        if (allNewsItems.length === 0) {
            console.log("No news items to display.");
            return;
        }

        // Clear previous news bubbles
        bubbleHolder.querySelectorAll('.news-item-bubble').forEach(el => el.remove());

        console.log(`Displaying news bubbles, starting from index ${currentNewsIndex}`);
        const newsBatch = [];
        for (let i = 0; i < NEWS_ITEMS_PER_BATCH; i++) {
            if (allNewsItems.length === 0) break; // Should not happen if initial check passes
            newsBatch.push(allNewsItems[currentNewsIndex % allNewsItems.length]);
            currentNewsIndex++; // Move to next news item, will wrap around thanks to modulo
        }
        // If currentNewsIndex became very large, bring it back to prevent potential overflow issues with very long runs
        if (allNewsItems.length > 0) { // only if allNewsItems is not empty
            currentNewsIndex %= allNewsItems.length;
        }


        newsBatch.forEach((newsItem, index) => {
            const newsBubbleContainer = document.createElement('div');
            // Assign classes for structure and animation. Add 'news-item-bubble' for specific management.
            // Use a cycling index for some variation based on existing bubble styles (e.g., bubble-4 to bubble-8 are small)
            const styleBaseIndex = 4 + (index % 5); // Cycles through 4, 5, 6, 7, 8 for class name
            newsBubbleContainer.className = `bubble-${styleBaseIndex} bubble-container bubble-animation-x news-item-bubble`;

            const innerBubble = document.createElement('div');
            innerBubble.className = 'bubble-small bubble-animation-y'; // Assuming all news bubbles are small
            innerBubble.textContent = newsItem.title; // Display news title

            newsBubbleContainer.appendChild(innerBubble);

            // Customize position and animation to differentiate from interactive bubbles and each other
            newsBubbleContainer.style.left = `${(index * 15 + 5) % 80}%`; 
            newsBubbleContainer.style.animationDelay = `${(index * 0.4 + 0.5)}s`; 
            innerBubble.style.animationDelay = `${(index * 0.3 + 0.2)}s`; 

            // Optional: Open news URL on click
            // newsBubbleContainer.addEventListener('click', () => { window.open(newsItem.url, '_blank'); });

            bubbleHolder.appendChild(newsBubbleContainer);
        });
        console.log(`Displayed ${newsBatch.length} news items.`);
    }

    // Initial greeting or prompt for interactive bubbles
    sendMessageToServer("initial_greeting"); 

    // Initial fetch of news
    fetchNews();

    // Set interval to fetch news every 10 minutes
    setInterval(fetchNews, NEWS_FETCH_INTERVAL);

    // Set interval to display news bubbles every 30 seconds
    setInterval(displayNewsBubbles, NEWS_DISPLAY_INTERVAL);
});
