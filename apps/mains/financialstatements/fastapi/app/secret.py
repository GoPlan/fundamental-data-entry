# to get a string like this run:
# openssl rand -hex 32
# SECRET_KEY = "(a hex string)"

from os import getenv

SECRET_KEY = str(getenv("SECRET_KEY"))
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
