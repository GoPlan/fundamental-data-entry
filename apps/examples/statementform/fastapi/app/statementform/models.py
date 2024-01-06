from pydantic import BaseModel, RootModel
from typing import Union, List

from datetime import datetime


class Statement(BaseModel):
    username: str
    stockcode: str
    statementtype: str
    quarter: str
    releasedate: datetime


class StatementList(RootModel):
    root: List[Statement] = []

    def append(self, statement: Statement):
        if statement:
            self.root.append(statement)


class StatementField(BaseModel):
    username: str
    stockcode: str
    statementtype: str
    quarter: str
    fieldname: str
    value: Union[float, None] = None
