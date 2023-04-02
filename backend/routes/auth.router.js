const Router = require ('express');
const upload = require('multer')();     // щоб можна було зчитувати data-form в постмані

const {authController, userController} = require("../controllers");
const {userMiddleware, authMiddleware} = require("../middlewares");
const {tokenTypes} = require("../constants");
const {authService} = require("../services");

const authRouter = Router();


authRouter.post (
    '/login',
    authMiddleware.checkLoginBodyIsValid,
    userMiddleware.checkUserIsExistByEmail,
    authMiddleware.checkPasswordsAreSame,
    authController.login);

authRouter.post (
    '/login/google',
    userMiddleware.checkEmailIsValid,
    authController.loginByGoogle);

authRouter.post (
    '/logout',
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    authController.logout);

// authRouter.post (
//     '/logout/fromEverywhere',
//     authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
//     authController.logoutFromEverywhere);

authRouter.post (
    '/registration',
    upload.any(),
    userMiddleware.checkNewUserBodyIsValid,
    // userMiddleware.checkUserIsExistByEmail,      якщо в нас в моделі юзера поле емейл стоїть - унікальне, чи треба ще перевіряти мідлварою???
    userController.createUser);

authRouter.post (
    '/registration/asRestaurantAdmin',
    upload.any(),
    userMiddleware.checkNewUserBodyIsValid,
    // userMiddleware.checkUserIsExistByEmail,      якщо в нас в моделі юзера поле емейл стоїть - унікальне, чи треба ще перевіряти мідлварою???
    userController.createUserAsRestaurantAdmin);

authRouter.post (
    '/refresh',
    authMiddleware.checkToken(tokenTypes.REFRESH_TYPE),
    authController.refresh);

authRouter.post (
    '/forgotPassword',
    userMiddleware.checkEmailIsValid,
    userMiddleware.checkUserIsExistByEmail,
    authController.forgotPasswordSendEmail);

authRouter.put (
    '/forgotPassword',
    userMiddleware.checkPasswordIsValid,
    authMiddleware.checkToken(tokenTypes.ACTION_TOKEN_TYPE),
    userMiddleware.checkNewPasswordIsDifferent,
    authController.forgotPasswordUpdatePassword);

// authRouter.get (
//     '/',
//     authController.getRefresh);

module.exports = authRouter
