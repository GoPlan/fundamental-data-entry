mongo_collection = process.env["MONGO_COLLECTION"]
db.createCollection(mongo_collection)
db.statements.createIndex(
    {
        username: 1,
        stockcode: 1,
        statementtype: 1,
        quarter: 1,
        fieldname: 1
    }
    , {
        unique: true
    })