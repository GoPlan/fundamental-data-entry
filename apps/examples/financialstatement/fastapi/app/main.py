from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "http://react:3000",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return "App is up!"


# import uvicorn

# if __name__ == "__main__":
#     uvicorn.run(app, port=8001)
