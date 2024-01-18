from mongo import users_collection


class User:
    @staticmethod
    def reset_password(username, new_password_hash):
        coll = users_collection()
        res = coll.update_one(
            {
                "username": username
            },
            {
                "$set": {
                    "password_hash": new_password_hash
                }
            },
            upsert=True
        )

        return res
