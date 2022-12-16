const Router = require ('express');
const {authController} = require("../controllers");
const {userMiddleware, authMiddleware} = require("../middlewares");
const authRouter = Router();

authRouter.post (
    '/login',
    authMiddleware.checkLoginBodyIsValid,
    userMiddleware.checkUserIsExistByEmail,
    authMiddleware.checkIsPasswordSame,
    authController.login)

module.exports = authRouter
