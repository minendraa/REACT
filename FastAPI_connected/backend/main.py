from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Add CORS middleware to the app
origins = [
    "http://localhost:3000",  # React frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow React app's domain
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Pydantic model and API endpoint
class Item(BaseModel):
    name: str
    description: str = None

@app.post("/process-data/")
async def process_data(item: Item):
    response = {
        "message": f"Data received: {item.name} - {item.description}"
    }
    return response
