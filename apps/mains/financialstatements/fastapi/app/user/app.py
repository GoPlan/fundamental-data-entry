from typing import Annotated
from fastapi import Depends, FastAPI
from passlib.context import CryptContext

from usersauth.user import User, get_current_active_user
from . import query

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI()


@app.get("/info/", response_model=User)
async def read_users_me(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user


@app.get("/{username}/resetpassword")
async def reset_password(username, new_password: str):
    new_hash = pwd_context.hash(new_password)
    res = query.User.reset_password(username, new_hash)
    return res.acknowledged
