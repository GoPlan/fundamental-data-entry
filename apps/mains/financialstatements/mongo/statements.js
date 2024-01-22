statements_coll = process.env["MONGO_STATEMENTS_COLLECTION"]
statementfields_coll = process.env["MONGO_STATEMENTFIELDS_COLLECTION"]

db[statements_coll].createIndex(
    {
        username: 1,
        stockcode: 1,
        period: 1,
        statementtype: 1,
    },
    {
        unique: true
    }
)

db[statementfields_coll].createIndex(
    {
        username: 1,
        stockcode: 1,
        period: 1,
        statementtype: 1,
        fieldname: 1,
    },
    {
        unique: true
    }
)

db[statements_coll].insertMany(
    [
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2023Q4",
            "statementtype": "Income"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2023Q4",
            "statementtype": "Balance"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2023Q4",
            "statementtype": "Cashflow"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2023Q3",
            "statementtype": "Income"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2023Q3",
            "statementtype": "Balance"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2023Q3",
            "statementtype": "Cashflow"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2023Q2",
            "statementtype": "Income"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2023Q2",
            "statementtype": "Balance"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2023Q2",
            "statementtype": "Cashflow"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2023Q1",
            "statementtype": "Income"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2023Q1",
            "statementtype": "Balance"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2023Q1",
            "statementtype": "Cashflow"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2022Q4",
            "statementtype": "Income"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2022Q4",
            "statementtype": "Balance"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2022Q4",
            "statementtype": "Cashflow"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2022Q3",
            "statementtype": "Income"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2022Q3",
            "statementtype": "Balance"
        },
        {
            "username": "user00",
            "stockcode": "BSR",
            "period": "2022Q3",
            "statementtype": "Cashflow"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2023Q4",
            "statementtype": "Income"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2023Q4",
            "statementtype": "Balance"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2023Q4",
            "statementtype": "Cashflow"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2023Q3",
            "statementtype": "Income"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2023Q3",
            "statementtype": "Balance"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2023Q3",
            "statementtype": "Cashflow"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2023Q2",
            "statementtype": "Income"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2023Q2",
            "statementtype": "Balance"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2023Q2",
            "statementtype": "Cashflow"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2023Q1",
            "statementtype": "Income"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2023Q1",
            "statementtype": "Balance"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2023Q1",
            "statementtype": "Cashflow"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2022Q4",
            "statementtype": "Income"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2022Q4",
            "statementtype": "Balance"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2022Q4",
            "statementtype": "Cashflow"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2022Q3",
            "statementtype": "Income"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2022Q3",
            "statementtype": "Balance"
        },
        {
            "username": "user00",
            "stockcode": "PVT",
            "period": "2022Q3",
            "statementtype": "Cashflow"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2023Q4",
            "statementtype": "Income"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2023Q4",
            "statementtype": "Balance"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2023Q4",
            "statementtype": "Cashflow"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2023Q3",
            "statementtype": "Income"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2023Q3",
            "statementtype": "Balance"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2023Q3",
            "statementtype": "Cashflow"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2023Q2",
            "statementtype": "Income"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2023Q2",
            "statementtype": "Balance"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2023Q2",
            "statementtype": "Cashflow"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2023Q1",
            "statementtype": "Income"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2023Q1",
            "statementtype": "Balance"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2023Q1",
            "statementtype": "Cashflow"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2022Q4",
            "statementtype": "Income"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2022Q4",
            "statementtype": "Balance"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2022Q4",
            "statementtype": "Cashflow"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2022Q3",
            "statementtype": "Income"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2022Q3",
            "statementtype": "Balance"
        },
        {
            "username": "user01",
            "stockcode": "BSR",
            "period": "2022Q3",
            "statementtype": "Cashflow"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2023Q4",
            "statementtype": "Income"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2023Q4",
            "statementtype": "Balance"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2023Q4",
            "statementtype": "Cashflow"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2023Q3",
            "statementtype": "Income"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2023Q3",
            "statementtype": "Balance"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2023Q3",
            "statementtype": "Cashflow"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2023Q2",
            "statementtype": "Income"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2023Q2",
            "statementtype": "Balance"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2023Q2",
            "statementtype": "Cashflow"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2023Q1",
            "statementtype": "Income"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2023Q1",
            "statementtype": "Balance"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2023Q1",
            "statementtype": "Cashflow"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2022Q4",
            "statementtype": "Income"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2022Q4",
            "statementtype": "Balance"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2022Q4",
            "statementtype": "Cashflow"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2022Q3",
            "statementtype": "Income"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2022Q3",
            "statementtype": "Balance"
        },
        {
            "username": "user01",
            "stockcode": "HPG",
            "period": "2022Q3",
            "statementtype": "Cashflow"
        }
    ]
)
