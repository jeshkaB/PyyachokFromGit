const User = require('../dataBase/User')

module.exports = {
    createUser(userObj) {
        return User.create(userObj);
    },
    getUsers() {
        return User.find();
    },
    getUserById(userId) {
        return User.findById(userId)
    },
    getUserByParams(filter) {
        return User.findOne(filter)
    },
    updateUser(userId, userObj) {
        return User.findOneAndUpdate({_id: userId}, userObj, {new: true})
    },
    deleteUser(userId) {
        return User.deleteOne({_id: userId})
    }
}
