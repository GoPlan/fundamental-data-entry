from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from financialstatements.app import app as statement_app
from usersauth.app import app as oauth2_app
from user.app import app as users_app

origins = [
    "http://localhost:3000"
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


app.mount("/oauth2", oauth2_app)
app.mount("/user", users_app)
app.mount("/statements", statement_app)

# import uvicorn

# if __name__ == "__main__":
#     uvicorn.run(app, port=8001)
