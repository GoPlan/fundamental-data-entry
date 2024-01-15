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
            password_hash: "demo",
            email: "user00@example.com",
            planet: "Earth",
            disabled: false
        }
    },
    {
        upsert: true
    }
)