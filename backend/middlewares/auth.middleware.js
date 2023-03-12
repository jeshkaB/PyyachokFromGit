const {hashService, userService, tokenService, authService} = require("../services");
const {LocalError} = require("../errors");
const {statusCode, tokenTypes} = require("../constants");
const {userValidator} = require("../validators");
const constants = require("constants");


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

    checkToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get('Authorization');
            if (!token) {
                return next(new LocalError('No token', statusCode.UNAUTHORIZED))
            }

            tokenService.checkToken(token, tokenType);

            const tokenInfo = await authService.getTokensInstanceWithUser({[tokenType]: token});

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

    // checkAccessToken: async (req, res, next) => {
    //
    //     try {
    //         const accessToken = req.get('Authorization');
    //         if (!accessToken) {
    //             return next(new LocalError('No token', statusCode.UNAUTHORIZED))
    //         }
    //
    //         tokenService.checkToken(accessToken, tokenTypes.ACCESS_TYPE);
    //
    //         const tokenInfo = await authService.getTokensInstanceWithUser({accessToken});
    //
    //         if (!tokenInfo) {
    //             return next(new LocalError('Not valid token', statusCode.UNAUTHORIZED));
    //         }
    //
    //         req.tokenInfo = tokenInfo;
    //
    //         next()
    //
    //     } catch (e) {
    //         next(e)
    //     }
    // }

//     checkRefreshToken: async (req, res, next) => {
//         try {
//             const refreshToken = req.get('Authorization');
//
//             if (!refreshToken) {
//                 return next(new LocalError('No token', statusCode.UNAUTHORIZED))}
//
//             tokenService.checkToken(refreshToken,tokenTypes.REFRESH_TYPE);
//
//             const tokenInfo = await authService.getTokensInstanceWithUser({ refreshToken });
//
//             if (!tokenInfo) {
//                 return next (new LocalError('Not valid token', statusCode.UNAUTHORIZED));
//             }
//
//             req.tokenInfo = tokenInfo;
//
//             next()
//
//         }catch (e) {
//             next(e)
//         }
//     },
// }
