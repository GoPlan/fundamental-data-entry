from fastapi import FastAPI
from .db import (
    init,
    update,
    get,
    QuarterStatementRow
)

app = FastAPI()


@app.get("/init")
async def statement_init():
    init()
    return "Db is created!"

# @app.get("/get/{username}/{stockcode}/{statement}/{quarter}/{fieldname}")
# async def statement_get(username, stockcode, statementtype, quarter, fieldname):
#     doc = get(username=username,
#               stockcode=stockcode,
#               statementtype=statementtype,
#               quarter=quarter,
#               fieldname=fieldname)
#
#     return doc.model_dump()
#
#
# @app.post("/update/{username}/{stockcode}/{statement}/{quarter}/{fieldname}")
# async def statement_update(username, stockcode, statementtype, quarter, fieldname, value):
#     doc = QuarterStatementRow(username=username,
#                               stockcode=stockcode,
#                               statementtype=statementtype,
#                               quarter=quarter,
#                               fieldname=fieldname,
#                               value=value)
#
#     res = update(statement_row=doc)
#
#     return res
