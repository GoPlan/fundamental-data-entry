from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from n3cov98.select import all

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


@app.get("/n3cov98")
async def marketstock():
    docs = all("n3cov98/data.csv")
    return docs.model_dump()

# import uvicorn

# if __name__ == "__main__":
#     uvicorn.run(app, port=8001)
