const {hashService, userService, tokenService, authService} = require("../services");
const {LocalError} = require("../errors");
const {statusCode} = require("../constants");
const {userValidator} = require("../validators");


module.exports = {
    checkLoginBodyIsValid: (req, res, next) => {
        try {
            const validate = userValidator.loginUserValidator.validate(req.body);
            if (validate.error) {
                return next(new LocalError(validate.error.message, statusCode.BAD_REQUEST));
            }
            req.body = validate.value;
            next()
        } catch (e) {
            next(e)
        }
    },
    checkPasswordsAreSame: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {_id} = req.user;
            const {password: hashPassword} = await userService.getUserById(_id);
            await hashService.comparePasswords(password, hashPassword);

            next()
        } catch (e) {
            next(e)
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');
            if (!accessToken) {
                return next(new LocalError('No token', statusCode.UNAUTHORIZED))}

            tokenService.checkAccessToken(accessToken);

            const tokenInfo = await authService.getTokensInstanceWithUser({ accessToken });

            if (!tokenInfo) {
                return next (new LocalError('Not valid token', statusCode.UNAUTHORIZED));
            }

            req.tokenInfo = tokenInfo;

            next()

        }catch (e) {
            next(e)
        }
    }
}
