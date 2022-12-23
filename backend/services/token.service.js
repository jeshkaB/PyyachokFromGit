const Jwt = require('jsonwebtoken');
const {
    ACCESS_SECRET_WORD,
    ACCESS_TOKEN_LIFETIME,
    REFRESH_SECRET_WORD,
    REFRESH_TOKEN_LIFETIME
} = require("../configs/config");
const {statusCode} = require("../constants");
const {LocalError} = require("../errors");



module.exports = {

    createAccessToken: (base = {}) => {
        return Jwt.sign(base, ACCESS_SECRET_WORD, {expiresIn: ACCESS_TOKEN_LIFETIME});
    },

    createRefreshToken: (base = {}) => {
        return Jwt.sign(base, REFRESH_SECRET_WORD, {expiresIn: REFRESH_TOKEN_LIFETIME});
    },

    checkAccessToken: (token) => {
        try {
            return Jwt.verify(token, ACCESS_SECRET_WORD)        // повертає об’єкт типу:{ _id: '63a5ee4eda883389f8bcb143', iat: 1671819356, exp: 1671819386 }

        }catch (e) {
            throw new LocalError('Token not valid', statusCode.UNAUTHORIZED)
        }
    }

    }

