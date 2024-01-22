from fastapi import FastAPI, Depends
from typing import Annotated

from usersauth.user import User, get_current_active_user
from . import query, models

app = FastAPI()


@app.get("/stockcodes")
async def list_stockcodes(current_user: Annotated[User, Depends(get_current_active_user)]):
    stockcodes = query.Statement.list_symbols(username=current_user.username)
    return stockcodes


@app.get("/list/{stockcode}")
async def list_statements(stockcode: str, current_user: Annotated[User, Depends(get_current_active_user)]):
    query_docs = query.Statement.list_statements(username=current_user.username, stockcode=stockcode)
    model_docs = models.StatementList.model_validate(query_docs).model_dump()
    return model_docs


@app.get("/get/{stockcode}/{period}/{statementtype}")
async def get_statement(stockcode: str,
                        period: str,
                        statementtype: str,
                        current_user: Annotated[User, Depends(get_current_active_user)]):
    query_docs = query.Statement.get(username=current_user.username,
                                     stockcode=stockcode,
                                     period=period,
                                     statementtype=statementtype)
    model_docs = models.Statement.model_validate(query_docs[0]).model_dump() if query_docs else None
    return model_docs


@app.post("/field/update")
async def update_field(field: models.StatementFieldUpdate,
                       current_user: Annotated[User, Depends(get_current_active_user)]):
    res = query.StatementField.update(current_user.username, field)
    return res.acknowledged
