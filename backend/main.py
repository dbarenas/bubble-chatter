from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

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
