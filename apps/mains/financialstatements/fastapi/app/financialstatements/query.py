from mongo import statments_collection, statementfields_collection
from . import models


class Statement():

    @staticmethod
    def list_symbols(username) -> list:
        coll = statments_collection()
        res = coll.find(
            {
                "username": username
            },
            {
                "stockcode": 1
            }
        )

        docs = list(res.distinct("stockcode"))

        return docs

    @staticmethod
    def list_statements(username, stockcode):
        coll = statments_collection()
        res = coll.find(
            {
                "username": username,
                "stockcode": stockcode
            },
        ).sort([("period", -1), ("statementtype", 1)])

        docs = list(res)

        return docs

    @staticmethod
    def get(username, stockcode, period, statementtype) -> list:
        coll = statments_collection()
        res = coll.aggregate([
            {
                "$match": {
                    'username': username,
                    'stockcode': stockcode,
                    'period': period,
                    'statementtype': statementtype,
                }
            },
            {
                '$lookup': {
                    'from': 'statementfields',
                    'as': 'statementfields',
                    'let': {
                        'username': '$username',
                        'stockcode': '$stockcode',
                        'statementtype': '$statementtype',
                        'period': '$period'
                    },
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    '$and': [
                                        {'$eq': ['$username', '$$username']},
                                        {'$eq': ['$stockcode', '$$stockcode']},
                                        {'$eq': ['$statementtype', '$$statementtype']},
                                        {'$eq': ['$period', '$$period']}
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        ])

        docs = list(res)

        return docs


class StatementField():
    @staticmethod
    def update(username, field: models.StatementFieldUpdate):
        coll = statementfields_collection()
        res = coll.update_one(
            {
                "username": username,
                "stockcode": field.stockcode,
                "period": field.period,
                "statementtype": field.statementtype,
                "fieldname": field.fieldname
            },
            {
                "$set": {
                    "value": field.value
                }
            },
            upsert=True
        )

        return res
