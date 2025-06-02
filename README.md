# Chat with Bubbles Demo

Based on a list of title,  urls, show iterative bubble by title.
![image](https://github.com/user-attachments/assets/d0ce535f-f194-4bb2-8fb1-b4d5fe51a5c9)

## Opportunities and Key Features

Dynamic Visualizations: Transform raw news data into an engaging visual landscape. The movement and interaction of the bubbles can make news consumption more active and less passive, encouraging users to delve deeper into topics that grab their attention.
## Real-time (or Near Real-time) Updates:

The underlying code can be adapted to pull in data from various news sources. Implement a refresh mechanism (like every 30 minutes, as you might choose) to ensure your bubble present consistently displays the latest developments.


# Customizable Data Streams: The flexibility of this project allows for seamless integration with diverse APIs and data feeds. This means you can tailor your "bubble present" to display news from specific outlets, focus on particular topics, or even visualize social media trends, creating a truly personalized news experience.

Engaging User Experience: Say goodbye to boring news feeds! Bubble Chatter introduces an element of discovery and play, making the process of staying informed genuinely enjoyable.
A Foundation for Innovation: As an open-source project, bubble-chatter is an excellent starting point for developers and data enthusiasts. The possibilities for expansion are vast, including:
* Implementing advanced filtering and sorting mechanisms for refined content discovery.
* Adding sentiment analysis to color-code bubbles based on the emotional tone of articles.
* Integrating with Natural Language Processing (NLP) to identify key entities and relationships within the news stream.
* Developing intuitive user interfaces for easy customization of news sources and visualization parameters.
* Exploring different bubble physics and interaction models for enhanced user engagement.


## Features

*  Instead as a navegable list, present a wallpaper 
*   Backend containerization using Docker and Docker Compose.
*   CORS (Cross-Origin Resource Sharing) enabled for easy local development with `file://` origins and standard HTTP origins.

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

This application consists of a backend service and a frontend user interface.

### Backend Setup & Execution

You can run the backend either natively using Python or using Docker.

#### Method 1: Running Backend Natively (Python)

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

**Running the Native Backend:**
From the project's root directory, run:
```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```
*   The backend API will be available at `http://127.0.0.1:8000`.
*   OpenAPI documentation: `http://127.0.0.1:8000/docs`.
*   The root endpoint `http://127.0.0.1:8000/` provides basic API information.

#### Method 2: Running Backend with Docker

**Prerequisites:**
*   Docker Desktop or Docker Engine installed and running.

**Option A: Using Docker Compose (Recommended)**
1.  **Build and Run:**
    Navigate to the project's root directory (where `docker-compose.yml` is located) and run:
    ```bash
    docker-compose up --build
    ```
    *   `--build` ensures the image is built (or rebuilt if changes like Dockerfile modifications occurred).
    *   To run in detached mode (background), add the `-d` flag: `docker-compose up -d --build`.
2.  **Accessing the Backend:** The backend API will be available at `http://127.0.0.1:8000`.
    *   The root endpoint `/` provides a welcome message.
    *   OpenAPI documentation: `http://127.0.0.1:8000/docs`.
3.  **Stopping:**
    *   If running in the foreground (`Ctrl+C` to interrupt), then `docker-compose down` to stop and remove containers/networks.
    *   If in detached mode, just `docker-compose down`.

**Option B: Using Docker CLI Directly**
1.  **Build the Docker Image:**
    Navigate to the project's root directory (where `Dockerfile` is located):
    ```bash
    docker build -t chat-bubble-backend .
    ```
2.  **Run the Docker Container:**
    ```bash
    docker run -d -p 8000:8000 --name chat-bubble-container chat-bubble-backend
    ```
    *   `-d` runs in detached mode. Remove for foreground mode.
3.  **Accessing the Backend:** The backend API will be available at `http://127.0.0.1:8000`.
    *   The root endpoint `/` provides a welcome message.
    *   OpenAPI documentation: `http://127.0.0.1:8000/docs`.
4.  **Stopping:**
    *   `docker stop chat-bubble-container` (if named)
    *   `docker rm chat-bubble-container` (to remove)

---

### Frontend Usage

Once the backend service is running (using either Method 1 or Method 2 above and accessible on `http://127.0.0.1:8000`):

1.  **Prerequisite:** A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
2.  **Open the Frontend:**
    *   Navigate to the `frontend` directory within the project using your computer's file explorer.
    *   Locate the `index.html` file.
    *   Open `index.html` in your web browser. You can typically do this by:
        *   Double-clicking the `index.html` file.
        *   Right-clicking on `index.html` and selecting "Open with..." and choosing your browser.
        *   Dragging the `index.html` file into an open browser window.
        *   Using your browser's "File" > "Open File..." (or similar) menu option and navigating to `frontend/index.html`.

The chat application should now be visible and interactive in your browser, communicating with the backend.

---

## How it Works (Summary)

The backend (`main.py`) defines two endpoints:
*   `/` (GET): Returns a welcome message and API information.
*   `/chat` (POST): Accepts a user message, processes it, and returns a list of bubble options.
It also includes CORS (Cross-Origin Resource Sharing) middleware to allow requests from the frontend (especially when opened as a local `file://` HTML file) to communicate with the backend server.

The frontend (`app.js`) sends user messages to the backend's `/chat` endpoint. D3.js renders the returned bubbles. Clicking a bubble sends its payload back to the backend.

EOF
