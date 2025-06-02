# Chat with Bubbles Demo

Based on a list of title,  urls, show iterative bubble by title.
![image](https://github.com/user-attachments/assets/d0ce535f-f194-4bb2-8fb1-b4d5fe51a5c9)

What it offers:

Dynamic Visualizations: At its core, Bubble Chatter is poised to generate interactive, bubble-based visualizations. Imagine news articles, topics, or trending keywords appearing as vibrant, expanding, and contracting bubbles, offering an intuitive and aesthetically pleasing way to explore current events.
Real-time (or near real-time) Updates: The underlying code can be adapted to pull in data from various news sources. With a well-implemented refresh mechanism (e.g., every 30 minutes, as you mentioned), this project empowers users to maintain a consistently updated view of the news landscape, ensuring they're always in tune with the latest developments.
Customizable Data Streams: The flexibility of the code allows for integration with diverse APIs and data feeds. This means you can tailor your "bubble present" to display news from specific outlets, focus on particular topics, or even visualize social media trends, creating a personalized news experience.
Engaging User Experience: Moving beyond traditional news feeds, Bubble Chatter introduces an element of discovery and play. The dynamic movement and interaction of the bubbles can make news consumption more engaging and less passive, encouraging users to delve deeper into topics that pique their interest.
Foundation for Further Development: As an open-source project, "bubble-chatter" serves as an excellent starting point for developers and data enthusiasts. Opportunities abound for:
Implementing advanced filtering and sorting mechanisms.
Adding sentiment analysis to color-code bubbles based on the emotional tone of articles.
Integrating with natural language processing (NLP) to identify key entities and relationships within the news.
Developing user interfaces for easy customization of news sources and visualization parameters.
Exploring different bubble physics and interaction models for enhanced user engagement.
Bubble Chatter is more than just a news reader; it's a dynamic canvas for visualizing the ever-flowing stream of information, offering a fresh, interactive, and highly customizable approach to staying informed.

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
