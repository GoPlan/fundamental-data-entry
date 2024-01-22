users_coll = process.env["MONGO_USERS_COLLECTION"]

db[users_coll].createIndex(
    {
        username: 1,
    },
    {
        unique: true
    }
)

db[users_coll].updateOne(
    {
        username: "user00",
    },
    {
        "$set": {
            password_hash: null,
            email: "user00@example.com",
            planet: "Earth",
            disabled: false,
            expired: true
        }
    },
    {
        upsert: true
    }
)

db[users_coll].updateOne(
    {
        username: "user01",
    },
    {
        "$set": {
            password_hash: null,
            email: "user01@example.com",
            planet: "Mars",
            disabled: false,
            expired: true
        }
    },
    {
        upsert: true
    }
)