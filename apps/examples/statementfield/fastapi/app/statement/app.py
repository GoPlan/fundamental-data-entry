from fastapi import FastAPI
from . import db

app = FastAPI()


@app.get("/get/{username}/{stockcode}/{statementtype}/{quarter}/{fieldname}")
async def statement_get(username, stockcode, statementtype, quarter, fieldname):
    doc = db.get(username=username,
                 stockcode=stockcode,
                 statementtype=statementtype,
                 quarter=quarter,
                 fieldname=fieldname)

    return doc.model_dump()


@app.post("/update")
async def statement_update(statement_row: db.QuarterStatementRow):
    res = db.update(statement_row=statement_row)
    return res.acknowledged
