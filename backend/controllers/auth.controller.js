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
            const {_id} = req.user; // з попередньої мідлвари

            const authTokens = {
                accessToken: tokenService.createAccessToken({_id}),
                refreshToken: tokenService.createRefreshToken({_id}),
                user: _id
            }
            await authService.saveTokens({...authTokens});

            res.json({
                ...authTokens,
                // user: req.user//TODO а чи потрібен мені тут повний юзер????
            })

        } catch (e) {
            next(e);
        }
    },
    refresh: async (req, res, next) => {
        try {
            const {user, refreshToken} = req.tokenInfo;

            await authService.deleteTokensPairByParams({refreshToken})

            const authTokens = {
                accessToken: tokenService.createAccessToken({user}),
                refreshToken: tokenService.createRefreshToken({user}),
                user:user

            }
            await authService.saveTokens({...authTokens});


            res.json({
                ...authTokens,
                user
            })

        } catch (e) {
            next(e);
        }
    }
}
