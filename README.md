# Chat with Bubbles Demo

This project demonstrates a simple web-based chat interface where user interactions can lead to a series of predefined options presented as clickable bubbles. It uses a Python FastAPI backend and an HTML/JavaScript/D3.js frontend. The backend can be run using Docker.

## Features

*   Type messages into an input field.
*   Receive responses as clickable bubbles.
*   Clicking a bubble sends its associated payload as a new message to the backend, triggering further responses.
*   Simple conversational flow based on predefined backend logic.
*   Backend containerization using Docker and Docker Compose.

## Project Structure

```
.
├── backend/
│   ├── main.py             # FastAPI application
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── index.html          # Main HTML file for the chat interface
│   ├── app.js              # JavaScript logic for frontend interactions and D3.js bubble rendering
│   └── style.css           # CSS for styling the chat interface
├── Dockerfile              # Dockerfile for building the backend image
├── docker-compose.yml      # Docker Compose file for managing the backend service
└── README.md               # This file
```

## Setup and Running

There are two main ways to run this application:

1.  **Running Backend Natively + Frontend in Browser (Original Method)**
2.  **Running Backend with Docker + Frontend in Browser**

---

### 1. Running Backend Natively + Frontend in Browser

**Backend (FastAPI):**

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
2.  **Install dependencies from `backend/requirements.txt`:**
    ```bash
    pip install -r backend/requirements.txt
    ```

**Running the Backend:**
From the project's root directory, run:
```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```
*   The backend API will be available at `http://127.0.0.1:8000`.
    *   A root endpoint `/` provides a welcome message.
*   OpenAPI documentation: `http://127.0.0.1:8000/docs`.

**Frontend (HTML, JS, D3.js):**

**Prerequisites:**
*   A modern web browser.

**Running the Frontend:**
1.  Ensure the backend server (native or Docker) is running and accessible on port 8000.
2.  Open the `frontend/index.html` file directly in your web browser.

---

### 2. Running Backend with Docker + Frontend in Browser

**Prerequisites:**
*   Docker Desktop or Docker Engine installed and running.

**Option A: Using Docker Compose (Recommended)**

1.  **Build and Run:**
    Navigate to the project's root directory (where `docker-compose.yml` is located) and run:
    ```bash
    docker-compose up --build
    ```
    *   `--build` ensures the image is built if it doesn't exist or if `Dockerfile` changed.
    *   To run in detached mode (in the background), use `docker-compose up -d --build`.

2.  **Accessing the Backend:**
    *   The backend API will be available at `http://127.0.0.1:8000`.
        *   A root endpoint `/` provides a welcome message.
    *   OpenAPI documentation: `http://127.0.0.1:8000/docs`.

3.  **Stopping:**
    *   If running in the foreground, press `Ctrl+C`.
    *   If running in detached mode, use `docker-compose down`.

**Option B: Using Docker CLI Directly**

1.  **Build the Docker Image:**
    Navigate to the project's root directory (where `Dockerfile` is located) and run:
    ```bash
    docker build -t chat-bubble-backend .
    ```
    *   `chat-bubble-backend` is the tag (name) for your image.

2.  **Run the Docker Container:**
    ```bash
    docker run -p 8000:8000 --name chat-bubble-container chat-bubble-backend
    ```
    *   `-p 8000:8000`: Maps port 8000 of the container to port 8000 on your host machine.
    *   `--name chat-bubble-container`: Assigns a name to your running container for easier management.
    *   To run in detached mode: `docker run -d -p 8000:8000 --name chat-bubble-container chat-bubble-backend`

3.  **Accessing the Backend:**
    *   As above, the backend will be on `http://127.0.0.1:8000`.
        *   A root endpoint `/` provides a welcome message.

4.  **Stopping and Removing the Container:**
    *   If running in foreground: `Ctrl+C`.
    *   To stop: `docker stop chat-bubble-container`.
    *   To remove: `docker rm chat-bubble-container`.

**Frontend:**
*   Regardless of how the backend is run with Docker, the frontend (`frontend/index.html`) is still opened directly in your web browser as described in the "Running Backend Natively" section. It will connect to `http://127.0.0.1:8000`.

---

## How it Works (Summary)

The backend (`main.py`) defines two endpoints:
*   `/` (GET): Returns a welcome message and API information.
*   `/chat` (POST): Accepts a user message, processes it, and returns a list of bubble options.

The frontend (`app.js`) sends user messages to the backend's `/chat` endpoint. D3.js renders the returned bubbles. Clicking a bubble sends its payload back to the backend.

EOF
