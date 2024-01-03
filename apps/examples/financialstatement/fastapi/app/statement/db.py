from pymongo import MongoClient
from os import getenv
from pydantic import BaseModel
from typing import Union

MONGO_HOST = getenv("MONGO_HOST")
MONGO_PORT = getenv("MONGO_PORT")
MONGO_DB = getenv("MONGO_DB")
MONGO_QUARTER_STATEMENT_COLLECTION = "quarter_statements"


def mongo_db():
    client = MongoClient(host=MONGO_HOST, port=MONGO_PORT)
    db = client.get_database(MONGO_DB)
    return db


class QuarterStatementRow(BaseModel):
    username: str
    stockcode: str
    statementtype: str
    quarter: str
    fieldname: str
    value: Union[float, None] = None


def quarter_statments_collection():
    coll = mongo_db()[MONGO_QUARTER_STATEMENT_COLLECTION]
    return coll


def init():
    _db = mongo_db()
    if MONGO_QUARTER_STATEMENT_COLLECTION not in _db.list_collection_names():
        coll = _db[MONGO_QUARTER_STATEMENT_COLLECTION]
        coll.create_index(
            [
                ("username", 1),
                ("stockcode", 1),
                ("statementtype", 1),
                ("quarter", 1),
                ("fieldname", 1),
            ],
            unique=True
        )


def update(statement_row: QuarterStatementRow):
    coll = quarter_statments_collection()
    res = coll.update_one(
        {
            "username": statement_row.username,
            "stockcode": statement_row.stockcode,
            "statementtype": statement_row.statementtype,
            "quarter": statement_row.quarter,
            "fieldname": statement_row.fieldname,
        },
        update=statement_row.model_dump(),
        upsert=True
    )

    return res


def get(username, stockcode, statementtype, quarter, fieldname) -> QuarterStatementRow:
    coll = quarter_statments_collection()
    res = coll.find_one(
        {
            "username": username,
            "stockcode": stockcode,
            "statementtype": statementtype,
            "quarter": quarter,
            "fieldname": fieldname
        }
    )

    doc = QuarterStatementRow(**res)

    return doc
