const Auth = require('../dataBase/Auth')
module.exports = {
    saveTokens(authTokens) {
        return Auth.create(authTokens)
    },
    getTokensInstanceWithUser(filter) {
        return Auth.findOne(filter).populate('user')
    },
    deleteTokensPairByParams(filter) {
        return Auth.deleteOne(filter)
    },
    deleteOneByParams(filter) {
        return Auth.deleteOne(filter)
    },
    deleteMany(filter) {
        return Auth.deleteMany(filter)
    },
}
