const Router = require ('express');
const {authController, userController} = require("../controllers");
const {userMiddleware, authMiddleware} = require("../middlewares");

const authRouter = Router();

authRouter.post (
    '/login',
    authMiddleware.checkLoginBodyIsValid,
    userMiddleware.checkUserIsExistByEmail,
    authMiddleware.checkIsPasswordSame,
    authController.login);

authRouter.post (
    '/registration',
    userMiddleware.checkNewUserBodyIsValid,
    // userMiddleware.checkUserIsExistByEmail,      якщо в нас в моделі юзера поле емейл стоїть - унікальне, чи треба ще перевіряти мідлварою???
    userController.createUser);

authRouter.post (
    '/registration/asRestaurantAdmin',
    userMiddleware.checkNewUserBodyIsValid,
    // userMiddleware.checkUserIsExistByEmail,      якщо в нас в моделі юзера поле емейл стоїть - унікальне, чи треба ще перевіряти мідлварою???
    userController.createUserAsRestaurantAdmin);

//TODO refresh token, password forgot, logout

module.exports = authRouter
