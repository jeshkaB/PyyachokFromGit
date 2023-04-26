const Router = require ('express');
// const upload = require('multer')(); //  щоб можна було зчитувати data-form в постмані
const {authController, userController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');
const {tokenTypes} = require('../constants');

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

authRouter.post (
  '/registration/superadmin',
  userMiddleware.checkSuperAdminIsNotExist,
  userController.createSuperAdmin);

authRouter.post (
  '/registration',
  // upload.any(),
  userMiddleware.checkNewUserBodyIsValid,
  userController.createUser);

authRouter.post (
  '/registration/asRestaurantAdmin',
  userMiddleware.checkNewUserBodyIsValid,
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

module.exports = authRouter;
