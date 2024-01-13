from datetime import datetime, timedelta, timezone
from typing import Annotated, Union

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt
from pydantic import BaseModel

from db import get_user, verify_password, fake_users_db

app = FastAPI()

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class Token(BaseModel):
    access_token: str
    token_type: str


def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    authenticated_user = user if user and verify_password(password, user.hashed_password) else None
    return authenticated_user


def create_access_token(data: dict, expires_delta: timedelta = 15):
    to_encode = data.copy()
    expire_dt = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire_dt})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@app.post("/token")
async def signin(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires_dt = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires_dt)

    return Token(access_token=access_token, token_type="bearer")
