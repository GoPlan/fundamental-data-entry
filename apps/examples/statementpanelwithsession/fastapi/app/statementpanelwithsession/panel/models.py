from pydantic import BaseModel, RootModel
from typing import Union, List

from datetime import datetime


class StatementField(BaseModel):
    fieldname: str
    value: Union[float, None] = None


class Statement(BaseModel):
    username: str
    stockcode: str
    statementtype: str
    quarter: str
    releasedate: Union[datetime, None] = None
    statementfields: List[StatementField] = None


class StatementList(RootModel):
    root: List[Statement] = []

    def append(self, statement: Statement):
        if statement:
            self.root.append(statement)


class StatementFieldUpdate(BaseModel):
    username: str
    stockcode: str
    statementtype: str
    quarter: str
    fieldname: str
    value: Union[float, None] = None
