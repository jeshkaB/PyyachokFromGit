const {
  authService,
  tokenService,
  userService,
  nodemailerService,
  tokenDbService,
  hashService
} = require('../services');

const {statusCode, urls, tokenTypes} = require('../constants');

module.exports = {
  login: async (req, res, next) => {
    try {
      const user = req.user; // з попередньої мідлвари
      const {_id} = user;
      const authTokens = {
        accessToken: tokenService.createAccessToken({_id}),
        refreshToken: tokenService.createRefreshToken({_id}),
        user: _id
      };
      const tokens = await authService.saveTokens({...authTokens});
      res.json({tokens, user});
    } catch (e) {
      next(e);
    }
  },

  loginByGoogle: async (req, res, next) => {//увійти, а якщо перший раз, то зареєструватися і зразу увійти
    try {
      const {name, email, uid} = req.body;
      let user = await userService.getUserByParams({email});

      if (!user) {
        const hashPassword = await hashService.hashPassword(uid);
        const userObj = ({name, email, password: hashPassword});
        user = await userService.createUser(userObj);
        await nodemailerService.sendEmail(user.email, 'Вхід', 'Ви успішно зарeєструвались на сайті "Пиячок"');
      }
      const {_id} = user;
      const authTokens = {
        accessToken: tokenService.createAccessToken({_id}),
        refreshToken: tokenService.createRefreshToken({_id}),
        user: _id
      };
      const tokens = await authService.saveTokens({...authTokens});
      res.json({tokens, user});


    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      const {user, accessToken} = req.tokenInfo;
      await authService.deleteOneByParams({user: user._id, accessToken});
      res.sendStatus(statusCode.NO_CONTENT);
    } catch (e) {
      next(e);
    }
  },
  refresh: async (req, res, next) => {
    try {

      const {user, refreshToken} = req.tokenInfo;
      const {_id} = user;
      await authService.deleteTokensPairByParams({refreshToken});

      const authTokens = {
        accessToken: tokenService.createAccessToken({_id}),
        refreshToken: tokenService.createRefreshToken({_id}),
        user: _id
      };
      const tokens = await authService.saveTokens({...authTokens});
      res.json({tokens, user});

    } catch (e) {
      next(e);
    }
  },
  forgotPasswordSendEmail: async (req, res, next) => {
    try {
      const {_id, email} = req.user;
      const actionToken = tokenService.createActionToken({_id});
      const token = {
        token: actionToken,
        tokenType: tokenTypes.ACTION_TOKEN_TYPE,
        user: _id
      };
      await tokenDbService.saveToken(token);

      const url = `${urls.URL_FORGOT_PASSWORD}?token=${actionToken}`;
      await nodemailerService.sendEmail(email, 
        'Відновлення паролю', 
        'Для відновлення паролю перейдіть за посиланням:', 
        url, 
        'Відновити');

      res.json();

    } catch (e) {
      next(e);
    }
  },
  forgotPasswordUpdatePassword: async (req, res, next) => {
    try {
      const {password} = req.body;
      const {token, user: {_id}} = req.tokenInfo;

      const hashPassword = await hashService.hashPassword(password);
      await authService.deleteMany({user: _id});
      await tokenDbService.deleteOneByParams({token});
      const user = await userService.updateUser(_id, {password: hashPassword});

      res.json(user);
    } catch (e) {
      next(e);
    }
  }
};
