from fastapi import FastAPI, Depends
from typing import Annotated
from ..users import User, get_current_active_user
from . import query, models

app = FastAPI()


@app.get("/list")
async def list_statements(current_user: Annotated[User, Depends(get_current_active_user)]):
    res = query.Statement.list(current_user.username)
    docs = models.StatementList.model_validate(res)
    return docs.model_dump()


@app.get("/get/{stockcode}/{statementtype}/{quarter}")
async def get_statement(stockcode: str,
                        statementtype: str,
                        quarter: str,
                        current_user: Annotated[User, Depends(get_current_active_user)]):
    res = query.Statement.get(current_user.username, stockcode, statementtype, quarter)
    doc = models.Statement.model_validate(res.next()).model_dump() if res.alive else None
    return doc


@app.post("/field/update")
async def update_field(field: models.StatementFieldUpdate):
    res = query.StatementField.update(field)
    return res.acknowledged
