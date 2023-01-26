const Auth = require('../dataBase/Auth')
module.exports = {
    saveTokens(authTokens) {
        return Auth.create(authTokens)
    },

    getTokensInstanceWithUser(filter) {
        return Auth.findOne(filter)
    },
    deleteTokensPairByParams(filter) {
        return Auth.deleteOne(filter)
    }
}
