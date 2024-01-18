from datetime import datetime, timedelta, timezone

from fastapi import FastAPI
from jose import jwt
from passlib.context import CryptContext
from pydantic import BaseModel

from mongo import users_collection
from secret import SECRET_KEY, ALGORITHM

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
