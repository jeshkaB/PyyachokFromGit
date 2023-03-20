const {hashService, userService, tokenService, authService, tokenDbService} = require("../services");
const {LocalError} = require("../errors");
const {statusCode, tokenTypes} = require("../constants");
const {userValidator} = require("../validators");
const statusCodes = require("../constants/statusCodes");


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
            const passwordsAreSame = await hashService.comparePasswords(password, hashPassword)
            if (!passwordsAreSame)
                return next(new LocalError('email or password is wrong', statusCodes.BAD_REQUEST))

            next()
        } catch (e) {
            next(e)
        }
    },

    checkToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get('Authorization');
            if (!token) {
                return next(new LocalError('No token', statusCode.UNAUTHORIZED))
            }

            tokenService.checkToken(token, tokenType);
            let tokenInfo = null;
            if (tokenType === tokenTypes.ACCESS_TYPE || tokenType === tokenTypes.REFRESH_TYPE)
                tokenInfo = await authService.getTokensInstanceWithUser({[tokenType]: token});
            if (tokenType === tokenTypes.ACTION_TOKEN_TYPE)
                tokenInfo = await tokenDbService.getTokenWithUser({token});

            if (!tokenInfo) {
                return next(new LocalError('Not valid token', statusCode.UNAUTHORIZED));
            }
            req.tokenInfo = tokenInfo;

            next()

        } catch (e) {
            next(e)
        }
    },
}

