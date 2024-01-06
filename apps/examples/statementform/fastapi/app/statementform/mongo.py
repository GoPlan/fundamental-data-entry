from pymongo import MongoClient
from os import getenv

from . import models

MONGO_HOST = getenv("MONGO_HOST")
MONGO_PORT = getenv("MONGO_PORT")
MONGO_USERNAME = getenv("MONGO_USERNAME")
MONGO_PASSWORD = getenv("MONGO_PASSWORD")
MONGO_DB = getenv("MONGO_DB")

MONGO_STATEMENTS_COLLECTION = getenv("MONGO_STATEMENTS_COLLECTION")
MONGO_STATEMENTFIELDS_COLLECTION = getenv("MONGO_STATEMENTFIELDS_COLLECTION")


def mongo_db():
    client = MongoClient(host=MONGO_HOST,
                         port=int(MONGO_PORT),
                         username=MONGO_USERNAME,
                         password=MONGO_PASSWORD)

    db = client.get_default_database(MONGO_DB)

    return db


def statments_collection():
    coll = mongo_db().get_collection(MONGO_STATEMENTS_COLLECTION)
    return coll


def statementfields_collection():
    coll = mongo_db().get_collection(MONGO_STATEMENTFIELDS_COLLECTION)
    return coll


class Statement():

    @staticmethod
    def update(username, stockcode, statementtype, quarter, releasedate):
        coll = statments_collection()
        res = coll.update_one(
            {
                "username": username,
                "stockcode": stockcode,
                "statementtype": statementtype,
                "quarter": quarter
            },
            {
                "$set": {
                    "releasedate": releasedate
                }
            },
            upsert=True
        )

        return res

    @staticmethod
    def list(username):
        coll = statments_collection()
        res = coll.find(
            {
                "username": username
            }
        )
        return res


class StatementField():
    @staticmethod
    def update(field: models.StatementField):
        coll = statementfields_collection()
        res = coll.update_one(
            {
                "username": field.username,
                "stockcode": field.stockcode,
                "statementtype": field.statementtype,
                "quarter": field.quarter,
                "fieldname": field.fieldname
            },
            {
                "$set": {
                    "value": field.value
                }
            },
            upsert=True
        )

        return res

    @staticmethod
    def get(username, stockcode, statementtype, quarter, fieldname):
        coll = statementfields_collection()
        doc = coll.find_one(
            {
                "username": username,
                "stockcode": stockcode,
                "statementtype": statementtype,
                "quarter": quarter,
                "fieldname": fieldname
            }
        )

        return doc
