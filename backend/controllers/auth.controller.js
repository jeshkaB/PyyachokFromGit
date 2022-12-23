const {authService, tokenService, userService} = require("../services");

module.exports = {
    registration: async (req,res,next) => {
      try {
          await userService.createUser(req.body)
      }  catch (e) {
          next(e)
      }
},
    login: async (req, res, next) => {
        try {
            const {_id} = req.user;

            const authTokens = {
                accessToken: tokenService.createAccessToken({_id}),
                refreshToken: tokenService.createRefreshToken({_id}),
                user: _id
            }
            await authService.saveTokens({...authTokens});

            res.json({
                ...authTokens,
                user: req.user
            })

        } catch (e) {
            next(e);
        }
    }
}
