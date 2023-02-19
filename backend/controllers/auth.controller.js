const {authService, tokenService, userService} = require("../services");
const {statusCode} = require("../constants");

module.exports = {
    registration: async (req,res,next) => {
      try {
         const user= await userService.createUser(req.body);

          res.status(statusCode.CREATE).json(user)
      }  catch (e) {
          next(e)
      }
},
    login: async (req, res, next) => {
        try {
            const {_id, role} = req.user; // з попередньої мідлвари


            const authTokens = {
                accessToken: tokenService.createAccessToken({_id}),
                refreshToken: tokenService.createRefreshToken({_id}),
                user: _id,
                role: role
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

    logout: async (req, res, next)=> {
        try{
            const {user, accessToken} = req.tokenInfo;
            await authService.deleteOneByParams({user:user._id, accessToken});
            res.sendStatus(statusCode.NO_CONTENT)
        }catch (e) {
            next(e)
        }
    },

    logoutFromEverywhere: async (req, res, next)=> {
        try{
            const {user} = req.tokenInfo;
            await authService.deleteMany({user:user._id});
            res.sendStatus(statusCode.NO_CONTENT)
        }catch (e) {
            next(e)
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
