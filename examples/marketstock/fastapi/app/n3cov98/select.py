from pandas import read_csv
from pendulum import DateTime
from .model import N3COV98


def all(csv_filepath: str):
    df = read_csv(csv_filepath)
    df['period'] = df.period.apply(lambda x: DateTime.fromisoformat(x))
    df.dropna(axis=0, inplace=True)
    docs = N3COV98.model_validate(df.to_dict(orient='list'))
    return docs
