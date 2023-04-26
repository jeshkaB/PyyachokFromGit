const Jwt = require('jsonwebtoken');
const {
  ACCESS_SECRET_WORD,
  ACCESS_TOKEN_LIFETIME,
  REFRESH_SECRET_WORD,
  REFRESH_TOKEN_LIFETIME, ACTION_TOKEN_SECRET_WORD, ACTION_TOKEN_LIFETIME
} = require('../configs/config');
const {statusCode, tokenTypes} = require('../constants');
const {LocalError} = require('../errors');


module.exports = {

  createAccessToken: (base = {}) => Jwt.sign(base, ACCESS_SECRET_WORD, {expiresIn: ACCESS_TOKEN_LIFETIME}),

  createRefreshToken: (base = {}) => Jwt.sign(base, REFRESH_SECRET_WORD, {expiresIn: REFRESH_TOKEN_LIFETIME}),

  createActionToken: (base = {}) => Jwt.sign(base, ACTION_TOKEN_SECRET_WORD, {expiresIn: ACTION_TOKEN_LIFETIME}),

  checkToken: (token, tokenType) => {
    try {
      if (tokenType===tokenTypes.ACCESS_TYPE)
      // eslint-disable-next-line max-len
      {return Jwt.verify(token, ACCESS_SECRET_WORD);} // повертає об’єкт типу:{ _id: '63a5ee4eda883389f8bcb143', iat: 1671819356, exp: 1671819386 }
      else if (tokenType===tokenTypes.REFRESH_TYPE)
      {return Jwt.verify(token, REFRESH_SECRET_WORD);}
      else if (tokenType===tokenTypes.ACTION_TOKEN_TYPE)
      {return Jwt.verify(token, ACTION_TOKEN_SECRET_WORD);}
      throw new Error();

    }catch (e) {
      throw new LocalError('Token not valid', statusCode.UNAUTHORIZED);
    }
  }

};

