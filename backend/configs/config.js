module.exports = {
  PORT: process.env.PORT ||5000,

  // MONGO_URL: process.env.MONGO_URL || 'mongodb://user:userPass@db:27017/pyyachok',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/pyyachok',

  ACCESS_SECRET_WORD: process.env.ACCESS_SECRET_WORD || 'ACCESS_SECRET_WORD',
  REFRESH_SECRET_WORD: process.env.REFRESH_SECRET_WORD || 'REFRESH_SECRET_WORD',
  ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '15m',
  REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '30d',

  ACTION_TOKEN_SECRET_WORD: process.env.ACTION_TOKEN_SECRET_WORD || 'ACTION_TOKEN_SECRET_WORD',
  ACTION_TOKEN_LIFETIME: process.env.ACTION_TOKEN_LIFETIME || '7d',

  SERVER_EMAIL: process.env.SERVER_EMAIl || 'somemail@gmail.com',
  SERVER_EMAIl_PASSWORD: process.env.SERVER_EMAIl_PASSWORD || 'password',
  SERVER_EMAIl_HOST: 'smtp.gmail.com',
  SERVER_EMAIL_PORT: 465,
  SERVER_EMAIL_SECURE: 'true'
};
