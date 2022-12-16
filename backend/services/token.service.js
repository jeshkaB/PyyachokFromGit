const Jwt = require('jsonwebtoken');
const {
    ACCESS_SECRET_WORD,
    ACCESS_TOKEN_LIFETIME,
    REFRESH_SECRET_WORD,
    REFRESH_TOKEN_LIFETIME
} = require("../configs/config");

module.exports = {
    createAccessToken: (base = {}) => {
        return Jwt.sign(base, ACCESS_SECRET_WORD, {expiresIn: ACCESS_TOKEN_LIFETIME});

    },

    createRefreshToken: (base = {}) => {
        return Jwt.sign(base, REFRESH_SECRET_WORD, {expiresIn: REFRESH_TOKEN_LIFETIME});

    },
}

