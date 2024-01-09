from fastapi import FastAPI
from . import mongo, models

app = FastAPI()


@app.get("/list/{username}")
async def list_statements(username):
    res = mongo.Statement.list(username)
    docs = models.StatementList.model_validate(res)
    return docs.model_dump()


@app.get("/get/{username}/{stockcode}/{statementtype}/{quarter}")
async def get_statement(username, stockcode, statementtype, quarter):
    res = mongo.Statement.get(username, stockcode, statementtype, quarter)
    doc = models.Statement.model_validate(res.next()).model_dump() if res.alive else None
    return doc


# @app.get("/field/get/{username}/{stockcode}/{statementtype}/{quarter}/{fieldname}")
# async def get_field(username, stockcode, statementtype, quarter, fieldname):
#     res = mongo.StatementField.get(username=username,
#                                    stockcode=stockcode,
#                                    statementtype=statementtype,
#                                    quarter=quarter,
#                                    fieldname=fieldname)
#
#     doc = models.StatementField(**res).model_dump() if res else models.StatementField(username=username,
#                                                                                       stockcode=stockcode,
#                                                                                       statementtype=statementtype,
#                                                                                       quarter=quarter,
#                                                                                       fieldname=fieldname)
#
#     return doc


@app.post("/field/update")
async def update_field(field: models.StatementFieldUpdate):
    res = mongo.StatementField.update(field)
    return res.acknowledged
