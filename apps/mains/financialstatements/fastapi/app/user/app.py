from typing import Annotated
from fastapi import Depends, FastAPI
from passlib.context import CryptContext

from usersauth.user import User, get_current_active_user

app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@app.get("/info/", response_model=User)
async def read_users_me(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user
