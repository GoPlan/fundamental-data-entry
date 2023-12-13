from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return "App is up!"

# import uvicorn

# if __name__ == "__main__":
#     uvicorn.run(app, port=8001)
