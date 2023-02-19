const Router = require ('express');
const upload = require('multer')();     // щоб можна було зчитувати data-form в постмані

const {authController, userController} = require("../controllers");
const {userMiddleware, authMiddleware} = require("../middlewares");

const authRouter = Router();


authRouter.post (
    '/login',
    authMiddleware.checkLoginBodyIsValid,
    userMiddleware.checkUserIsExistByEmail,
    authMiddleware.checkPasswordsAreSame,
    authController.login);

authRouter.post (
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

authRouter.post (
    '/logout/fromEverywhere',
    authMiddleware.checkAccessToken,
    authController.logoutFromEverywhere);

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
    authMiddleware.checkRefreshToken,
    authController.refresh);

//TODO nodemailer, password forgot, logout,

module.exports = authRouter
