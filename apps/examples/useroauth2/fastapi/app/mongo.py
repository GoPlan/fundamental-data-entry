from pymongo import MongoClient
from os import getenv

MONGO_HOST = getenv("MONGO_HOST")
MONGO_PORT = getenv("MONGO_PORT")
MONGO_USERNAME = getenv("MONGO_USERNAME")
MONGO_PASSWORD = getenv("MONGO_PASSWORD")
MONGO_DB = getenv("MONGO_DB")

MONGO_USERS_COLLECTION = getenv("MONGO_USERS_COLLECTION")


def mongo_db():
    client = MongoClient(host=MONGO_HOST,
                         port=int(MONGO_PORT),
                         username=MONGO_USERNAME,
                         password=MONGO_PASSWORD)

    db = client.get_default_database(MONGO_DB)

    return db


def users_collection():
    coll = mongo_db().get_collection(MONGO_USERS_COLLECTION)
    return coll
