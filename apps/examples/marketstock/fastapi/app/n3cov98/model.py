from pydantic import BaseModel, RootModel
from datetime import datetime

from typing import Optional, List


class N3COV98(BaseModel):
    period: datetime
    close: Optional[float] = None
    eps: Optional[float] = None
    ret: Optional[float] = None


class N3COV98List(RootModel):
    root: List[N3COV98] = []
