const {Router} = require('express');
// const upload = require('multer')();     // щоб можна було зчитувати data-form

const {userController, authController} = require("../controllers");
const {forAllMiddleware, userMiddleware, authMiddleware} = require("../middlewares");
const {roles, tokenTypes} = require("../constants");

const userRouter = Router();


userRouter.get(
    '/',
    userController.getUsers);

userRouter.post(
    '/',
    // upload.any(),
    userMiddleware.checkNewUserBodyIsValid,
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    forAllMiddleware.checkRole(roles.SUPER_ADMIN),
    userMiddleware.checkUserFieldIsUnique('email'),
    userMiddleware.checkUserFieldIsUnique('name'),
    userController.createUser);

userRouter.get(
    '/:userId',
    forAllMiddleware.checkIdIsValid('userId'),
    userMiddleware.checkUserIsExist(),
    userController.getUserById);

userRouter.patch(
    '/:userId',
    // upload.any(),
    forAllMiddleware.checkIdIsValid('userId'),
    userMiddleware.checkUpdateUserBodyIsValid,
    userMiddleware.checkUserFieldIsUnique('name'),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    forAllMiddleware.checkIdAreSame ('userId'),
    userMiddleware.checkUserIsExist(),
    userController.updateUser);

userRouter.put(
    '/:userId/changePassword',
    forAllMiddleware.checkIdIsValid('userId'),
    userMiddleware.checkPasswordPairIsValid,
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    // forAllMiddleware.checkIdAreSame ('userId'),
    userMiddleware.checkUserIsExist(),
    userMiddleware.checkOldPasswordIsRight,
    userController.updateUserPassword);

userRouter.delete(
    '/:userId',
    forAllMiddleware.checkIdIsValid('userId'),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    forAllMiddleware.checkIdAreSame ('userId'),
    userMiddleware.checkUserIsExist(),
    userController.deleteUser);

// /для додавання в улюблені: шлях "users/id/favoriteRest?restId=...."
userRouter.post(
    '/:userId/favoriteRest',
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    userMiddleware.checkUserIsExist(),
    userController.addFavoriteRest);

userRouter.delete(
    '/:userId/favoriteRest',
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    userMiddleware.checkUserIsExist(),
    userMiddleware.checkUserIsExist(),
    userController.removeFavoriteRest);


module.exports = userRouter
