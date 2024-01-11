statements_coll = process.env["MONGO_STATEMENTS_COLLECTION"]
statementfields_coll = process.env["MONGO_STATEMENTFIELDS_COLLECTION"]

db.createCollection(statements_coll)
db.statements.createIndex(
    {
        username: 1,
        stockcode: 1,
        statementtype: 1,
        quarter: 1,
    },
    {
        unique: true
    }
)
db.statements.updateOne(
    {
        username: "user00",
        stockcode: "PVT",
        statementtype: "Income",
        quarter: "2023Q4",
    },
    {
        "$set": {
            releasedate: ISODate("2023-10-01")
        }
    },
    {
        upsert: true
    }
)

db.createCollection(statementfields_coll)
db.statementfields.createIndex(
    {
        username: 1,
        stockcode: 1,
        statementtype: 1,
        quarter: 1,
        fieldname: 1,
    },
    {
        unique: true
    }
)    