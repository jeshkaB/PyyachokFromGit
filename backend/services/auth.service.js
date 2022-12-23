const Auth = require('../dataBase/Auth')
module.exports = {
    saveTokens(authTokens) {
        return Auth.create(authTokens)
    },

    getTokensInstanceByParams(filter) {
        return Auth.findOne(filter)
    },

    getTokensInstanceWithUser(filter) {
        return Auth.findOne(filter).populate('user')
    }
}
