db.createUser(
    {
        user: 'user',
        pwd: 'userPass',
        roles: [
            {
                role: 'readWrite',
                db: 'pyyachok'
            }
        ]
    }
)
