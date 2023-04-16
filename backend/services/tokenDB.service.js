const Token = require('../dataBase/Token');

module.exports = {
    saveToken(token) {
        return Token.create(token)
    },
    getTokenWithUser(filter) {
        return Token.findOne(filter).populate('user')
    },

    deleteOneByParams(filter) {
        return Token.deleteOne(filter)
    },
    deleteMany(filter) {
        return Token.deleteMany(filter)
    },
}
