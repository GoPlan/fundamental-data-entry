from fastapi import FastAPI
from . import mongo, models

app = FastAPI()


@app.get("/field/get/{username}/{stockcode}/{statementtype}/{quarter}/{fieldname}")
async def get_field(username, stockcode, statementtype, quarter, fieldname):
    res = mongo.StatementField.get(username=username,
                                   stockcode=stockcode,
                                   statementtype=statementtype,
                                   quarter=quarter,
                                   fieldname=fieldname)

    doc = models.StatementField(**res).model_dump() if res else models.StatementField(username=username,
                                                                                      stockcode=stockcode,
                                                                                      statementtype=statementtype,
                                                                                      quarter=quarter,
                                                                                      fieldname=fieldname)

    return doc


@app.post("/field/update")
async def update_field(field: models.StatementField):
    res = mongo.StatementField.update(field)
    return res.acknowledged
