const {
    authService,
    tokenService,
    userService,
    nodemailerService,
    actionTokenService,
    tokenDbService,
    hashService
} = require("../services");
const {statusCode, urls, tokenTypes} = require("../constants");
const {LocalError} = require("../errors");
const statusCodes = require("../constants/statusCodes");
const {userMiddleware} = require("../middlewares");
const {userController} = require("./index");

module.exports = {
    // registration: async (req, res, next) => {
    //     try {
    //         const user = await userService.createUser(req.body);
    //         await nodemailerService.sendEmail(user.email, 'Вхід', 'Ви успішно зараєструвались на сайті "Пиячок"');
    //         res.status(statusCode.CREATE).json(user)
    //
    //     } catch (e) {
    //         next(e)
    //     }
    // },
    login: async (req, res, next) => {
        try {

            const user = req.user; // з попередньої мідлвари
            const {_id} = user
            const authTokens = {
                accessToken: tokenService.createAccessToken({_id}),
                refreshToken: tokenService.createRefreshToken({_id}),
                user: _id
            }
            const tokens = await authService.saveTokens({...authTokens});
            res.json({tokens, user})

        } catch (e) {
            next(e);
        }
    },

    loginByGoogle: async (req, res, next) => {//увійти, а якщо перший раз, то зареєструватися і зразу увійти
        try {
            console.log(req.body)
            const {name, email, uid} = req.body
            let user = await userService.getUserByParams({email});

            if (!user) {
                const hashPassword = await hashService.hashPassword(uid);
                const userObj = ({name, email, password: hashPassword})
                user = await userService.createUser(userObj);
                await nodemailerService.sendEmail(user.email, 'Вхід', 'Ви успішно зараєструвались на сайті "Пиячок"');
                console.log(user)
            }
            console.log(user)
            const {_id} = user
            const authTokens = {
                accessToken: tokenService.createAccessToken({_id}),
                refreshToken: tokenService.createRefreshToken({_id}),
                user: _id
            }
            const tokens = await authService.saveTokens({...authTokens});
            res.json({tokens, user})


        } catch (e) {
            next(e)
        }
    },

    logout: async (req, res, next) => {
        try {
            const {user, accessToken} = req.tokenInfo;
            await authService.deleteOneByParams({user: user._id, accessToken});
            res.sendStatus(statusCode.NO_CONTENT)
        } catch (e) {
            next(e)
        }
    },

    logoutFromEverywhere: async (req, res, next) => {
        try {
            const {user} = req.tokenInfo;
            await authService.deleteMany({user: user._id});
            res.sendStatus(statusCode.NO_CONTENT)
        } catch (e) {
            next(e)
        }
    },

    refresh: async (req, res, next) => {
        try {

            const {user, refreshToken} = req.tokenInfo;
            const {_id} = user
            await authService.deleteTokensPairByParams({refreshToken})

            const authTokens = {
                accessToken: tokenService.createAccessToken({_id}),
                refreshToken: tokenService.createRefreshToken({_id}),
                user: _id
            }
            const tokens = await authService.saveTokens({...authTokens});
            // console.log({...tokens})
            // об’єкт, отриманий з БД методами монгусаб не можна деструктуризувати як звичайний об’єкт, виходить великий складний об’єкт, де наш tokens сидить в полі _doc

            res.json({tokens, user})


        } catch (e) {
            next(e);
        }
    },
    forgotPasswordSendEmail: async (req, res, next) => {
        try {
            const {_id, email} = req.user
            const actionToken = tokenService.createActionToken({_id})
            const token = {
                token: actionToken,
                tokenType: tokenTypes.ACTION_TOKEN_TYPE,
                user: _id
            }
            await tokenDbService.saveToken(token)

            const url = `${urls.URL_FORGOT_PASSWORD}?token=${actionToken}`
            await nodemailerService.sendEmail(email, 'Відновлення паролю', 'Для відновлення паролю перейдіть за посиланням:', url, 'Відновити')

            res.json()

        } catch (e) {
            next(e)
        }
    },
    forgotPasswordUpdatePassword: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {token, user: {_id}} = req.tokenInfo;

            const hashPassword = await hashService.hashPassword(password);
            await authService.deleteMany({user: _id});
            await tokenDbService.deleteOneByParams({token})
            const user = await userService.updateUser(_id, {password: hashPassword});

            res.json(user)
        } catch (e) {
            next(e)
        }
    }

}
