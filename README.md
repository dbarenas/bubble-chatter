# Chat with Bubbles Demo

This project demonstrates a simple web-based chat interface where user interactions can lead to a series of predefined options presented as clickable bubbles. It uses a Python FastAPI backend and an HTML/JavaScript/D3.js frontend.

## Features

*   Type messages into an input field.
*   Receive responses as clickable bubbles.
*   Clicking a bubble sends its associated payload as a new message to the backend, triggering further responses.
*   Simple conversational flow based on predefined backend logic.

## Project Structure

```
.
├── backend/
│   └── main.py       # FastAPI application
├── frontend/
│   ├── index.html    # Main HTML file for the chat interface
│   ├── app.js        # JavaScript logic for frontend interactions and D3.js bubble rendering
│   └── style.css     # CSS for styling the chat interface
└── README.md         # This file
```

## Setup and Running

### 1. Backend (FastAPI)

**Prerequisites:**
*   Python 3.7+
*   pip (Python package installer)

**Installation:**

Navigate to the project's root directory in your terminal.

1.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

2.  **Install dependencies:**
    ```bash
    pip install fastapi uvicorn[standard] pydantic
    ```

**Running the Backend:**

From the project's root directory, run:
```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```
*   `--reload`: Enables auto-reload when code changes.
*   `--host 0.0.0.0`: Makes the server accessible on your network (useful if testing from another device or VM).
*   `--port 8000`: Specifies the port. The frontend `app.js` expects the backend to be on this port.

The backend API will be available at `http://127.0.0.1:8000`. You can see the OpenAPI documentation at `http://127.0.0.1:8000/docs`.

### 2. Frontend (HTML, JS, D3.js)

**Prerequisites:**
*   A modern web browser that supports HTML5, JavaScript (ES6+), and D3.js.

**Running the Frontend:**

1.  Ensure the backend server is running (see step above).
2.  Open the `frontend/index.html` file directly in your web browser.
    *   You can usually do this by right-clicking the file in your file explorer and choosing "Open with" and selecting your browser, or by typing the file path into your browser's address bar (e.g., `file:///path/to/your/project/frontend/index.html`).

## How it Works

1.  The user types a message in the input field and clicks "Send" (or presses Enter).
2.  The JavaScript in `frontend/app.js` captures this message.
3.  It displays the user's message in the chat log.
4.  It sends the message to the `/chat` endpoint of the FastAPI backend (running on `http://127.0.0.1:8000`).
5.  The backend (`backend/main.py`) processes the message:
    *   If the message is "hello" (case-insensitive), it returns a specific set of bubble options.
    *   Otherwise, it returns a default set of bubble options.
6.  The frontend JavaScript receives the JSON response containing the bubbles.
7.  D3.js is used to render these bubbles dynamically in the `#bubble-container`.
8.  If the user clicks on a bubble:
    *   The text of the bubble is displayed as a new user message in the chat log.
    *   The `payload` associated with that bubble is sent as a new message to the backend.
    *   The process repeats from step 5, allowing for a continued "conversation."

EOF
