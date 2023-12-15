from pydantic import BaseModel
from datetime import datetime

from typing import List, Optional


class N3COV98(BaseModel):
    period: List[datetime]
    close: List[Optional[float]]
    eps: List[Optional[float]]
    ret: List[Optional[float]]
