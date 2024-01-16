from typing import Annotated, Union
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, FastAPI, HTTPException, status
from jose import JWTError, jwt
from pydantic import BaseModel
from passlib.context import CryptContext

from .secret import SECRET_KEY, ALGORITHM
from .mongo import users_collection

app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/oauth2/token")

USER00_DEFAULT_PLAIN_PASSWORD = "demo"


class TokenData(BaseModel):
    username: Union[str, None] = None


class User(BaseModel):
    username: str
    email: Union[str, None] = None
    planet: Union[str, None] = None
    disabled: Union[bool, None] = None


def get_user(username):
    coll = users_collection()
    doc = coll.find_one(
        {
            "username": username
        },
        {
            "username": 1,
            "email": 1,
            "planet": 1,
            "disabled": 1
        }
    )

    user = User(**doc) if doc else None

    return user


def update_user00_hash(password_hash):
    coll = users_collection()
    res = coll.update_one(
        {
            "username": "user00"
        },
        {
            "$set": {
                "password_hash": password_hash
            }
        })

    return res


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")

        if username is None:
            raise credentials_exception

        token_data = TokenData(username=username)

    except JWTError:
        raise credentials_exception

    user = get_user(username=token_data.username)

    if user is None:
        raise credentials_exception

    return user


async def get_current_active_user(current_user: Annotated[User, Depends(get_current_user)]):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")

    return current_user


@app.get("/user00/updatehash")
async def user00_update_hash():
    password_hash = pwd_context.hash(USER00_DEFAULT_PLAIN_PASSWORD)
    res = update_user00_hash(password_hash)
    return f"user00 'demo' password has been hashed - {res.acknowledged}"


@app.get("/me/", response_model=User)
async def read_users_me(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user

#
# @app.get("/me/items/")
# async def read_own_items(current_user: Annotated[User, Depends(get_current_active_user)]):
#     return [{"item_id": "Foo", "owner": current_user.username}]
