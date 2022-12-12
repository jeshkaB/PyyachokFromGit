const User = require('../dataBase/User')

module.exports = {
    createUser(userObj) {
        return User.create(userObj)
    },
    getUsers() {
        return User.find();
    },
    getUserById(userId) {
        return User.findById({_id: userId})
    },
    updateUser(userId, userObj) {
        return User.updateOne({_id: userId}, userObj, {new: true})
    },
    deleteUser(userId) {
        return User.deleteOne({_id:userId})
    }
}
