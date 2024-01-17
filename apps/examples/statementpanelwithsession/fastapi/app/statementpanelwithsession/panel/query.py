from ..mongo import statments_collection, statementfields_collection
from . import models


class Statement():

    @staticmethod
    def list(username):
        coll = statments_collection()
        res = coll.find(
            {
                "username": username
            }
        )
        return res

    @staticmethod
    def get(username, stockcode, statementtype, quarter):
        coll = statments_collection()
        res = coll.aggregate([
            {
                "$match": {
                    'username': username,
                    'stockcode': stockcode,
                    'statementtype': statementtype,
                    'quarter': quarter
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
                        'quarter': '$quarter'
                    },
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    '$and': [
                                        {'$eq': ['$username', '$$username']},
                                        {'$eq': ['$stockcode', '$$stockcode']},
                                        {'$eq': ['$statementtype', '$$statementtype']},
                                        {'$eq': ['$quarter', '$$quarter']}
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        ])

        return res


class StatementField():
    @staticmethod
    def update(username, field: models.StatementFieldUpdate):
        coll = statementfields_collection()
        res = coll.update_one(
            {
                "username": username,
                "stockcode": field.stockcode,
                "statementtype": field.statementtype,
                "quarter": field.quarter,
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
