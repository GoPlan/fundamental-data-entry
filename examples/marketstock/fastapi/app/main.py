from fastapi import FastAPI
from n3cov98.select import all

app = FastAPI()


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
