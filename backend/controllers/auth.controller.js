const tokenService = require("../services/token.service");
const {authService} = require("../services");
module.exports = {
    login: async (req, res, next) => {
        try {
            const {_id} = req.user;

            const authTokens = {
                accessToken: tokenService.createAccessToken({_id}),
                refreshToken: tokenService.createRefreshToken({_id}),
                user: _id
            }


            await authService.saveTokens({authTokens}); //  а можна без {}?
            //TODO
            //await emailService.sendEmail(email, emailActionEnum.FORGOT_PASSWORD);
            res.json({
                ...authTokens,
                user: req.user
            })

        } catch (e) {
            next(e);
        }
    }
}
