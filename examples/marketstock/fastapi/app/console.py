from importlib import reload
from n3cov98 import select

reload(select)

filepath = "n3cov98/data.csv"

docs = select.all(filepath)

print(docs.model_dump())

#%%



