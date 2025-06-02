from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Added
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Add CORS middleware
origins = [
    "null",  # Allow file:// origin (for local index.html)
    "http://localhost", # Common for local dev
    "http://127.0.0.1", # Common for local dev
    # Add other origins if needed, e.g., a frontend dev server port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # Or use ["*"] for a public API, but specific is better
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"], # OPTIONS is important for preflight requests
    allow_headers=["*"] # Or specify headers like ["Content-Type"]
)

# Root endpoint
@app.get("/")
async def read_root():
    return {
        "message": "Welcome to the Chat Bubble Backend!",
        "description": "This API powers a chat interface with dynamic bubble responses.",
        "usage_note": "The main chat functionality is at the /chat (POST) endpoint.",
        "documentation_url": "/docs",
        "openapi_url": "/openapi.json"
    }

class ChatMessage(BaseModel):
    message: str

class BubbleOption(BaseModel):
    text: str
    payload: str

class ChatResponse(BaseModel):
    bubbles: List[BubbleOption]

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(chat_message: ChatMessage):
    message = chat_message.message.lower()
    if message == "hello":
        bubbles = [
            BubbleOption(text="How are you?", payload="how_are_you"),
            BubbleOption(text="Tell me a joke", payload="tell_joke"),
            BubbleOption(text="What's the weather?", payload="weather_query")
        ]
    else:
        bubbles = [
            BubbleOption(text="Default Option 1", payload="default_1"),
            BubbleOption(text="Default Option 2", payload="default_2")
        ]
    return ChatResponse(bubbles=bubbles)

# To run this app (from the root directory of the project):
# uvicorn backend.main:app --reload
