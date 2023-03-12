const ActionToken = require('../dataBase/ActionToken')
module.exports = {
    saveToken(actionToken) {
        return ActionToken.create(authTokens)
    },
    getTokenWithUser(filter) {
        return ActionToken.findOne(filter).populate('user')
    },

    deleteOneByParams(filter) {
        return ActionToken.deleteOne(filter)
    },
    deleteMany(filter) {
        return ActionToken.deleteMany(filter)
    },
}
