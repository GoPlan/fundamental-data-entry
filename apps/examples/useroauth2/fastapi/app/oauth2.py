from datetime import datetime, timedelta, timezone
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from pydantic import BaseModel
from passlib.context import CryptContext

from jwt import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from mongo import users_collection

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI()


class Token(BaseModel):
    access_token: str
    token_type: str


class User(BaseModel):
    username: str
    password_hash: str


def get_user(username) -> User:
    coll = users_collection()
    doc = coll.find_one(
        {
            "username": username
        },
        {
            "username": 1,
            "password_hash": 1
        }
    )

    user = User(**doc) if doc else None

    return user


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(username: str, password: str):
    user = get_user(username)
    authenticated_user = user if user and verify_password(password, user.password_hash) else None
    return authenticated_user


def create_access_token(data: dict, expires_delta: timedelta = 15):
    to_encode = data.copy()
    expire_dt = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire_dt})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@app.post("/token")
async def signin(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
    user = authenticate_user(form_data.username, form_data.password)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires_dt = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires_dt)

    return Token(access_token=access_token, token_type="bearer")
