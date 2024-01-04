from pymongo import MongoClient
from os import getenv
from pydantic import BaseModel
from typing import Union

MONGO_HOST = getenv("MONGO_HOST")
MONGO_PORT = getenv("MONGO_PORT")
MONGO_USERNAME = getenv("MONGO_USERNAME")
MONGO_PASSWORD = getenv("MONGO_PASSWORD")
MONGO_DB = getenv("MONGO_DB")
MONGO_COLLECTION = getenv("MONGO_COLLECTION")


def mongo_db():
    client = MongoClient(host=MONGO_HOST,
                         port=int(MONGO_PORT),
                         username=MONGO_USERNAME,
                         password=MONGO_PASSWORD)

    db = client.get_default_database(MONGO_DB)
    return db


class QuarterStatementRow(BaseModel):
    username: str
    stockcode: str
    statementtype: str
    quarter: str
    fieldname: str
    value: Union[float, None] = None


def statments_collection():
    coll = mongo_db().get_collection(MONGO_COLLECTION)
    return coll


def update(statement_row: QuarterStatementRow):
    coll = statments_collection()
    res = coll.update_one(
        {
            "username": statement_row.username,
            "stockcode": statement_row.stockcode,
            "statementtype": statement_row.statementtype,
            "quarter": statement_row.quarter,
            "fieldname": statement_row.fieldname,
        },
        {
            "$set": statement_row.model_dump()
        },
        upsert=True
    )

    return res


def get(username, stockcode, statementtype, quarter, fieldname) -> QuarterStatementRow:
    coll = statments_collection()

    ident = {
        "username": username,
        "stockcode": stockcode,
        "statementtype": statementtype,
        "quarter": quarter,
        "fieldname": fieldname
    }

    res = coll.find_one(ident)

    doc = QuarterStatementRow(**res) if res else QuarterStatementRow(**ident)

    return doc
