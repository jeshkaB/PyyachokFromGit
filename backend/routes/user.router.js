const {Router} = require('express');
// const upload = require('multer')();     // щоб можна було зчитувати data-form

const {userController} = require("../controllers");
const {forAllMiddleware, userMiddleware, authMiddleware} = require("../middlewares");

const userRouter = Router();


userRouter.get(
    '/',
    userController.getUsers);

userRouter.post(
    '/',
    // upload.any(),
    userMiddleware.checkNewUserBodyIsValid,
    // authMiddleware.checkAccessToken,
    // forAllMiddleware.checkRole(roles.SUPER_ADMIN),
    userMiddleware.checkEmailIsUnique,
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
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkIdAreSame ('userId'),
    userMiddleware.checkUserIsExist(),
    userController.updateUser);

userRouter.put(
    '/:userId/changePassword',
    forAllMiddleware.checkIdIsValid('userId'),
    authMiddleware.checkAccessToken,
    // forAllMiddleware.checkIdAreSame ('userId'),
    userMiddleware.checkUserIsExist(),
    userMiddleware.checkChangePassword,
    userController.updateUserPassword);

userRouter.delete(
    '/:userId',
    forAllMiddleware.checkIdIsValid('userId'),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkIdAreSame ('userId'),
    userMiddleware.checkUserIsExist(),
    userController.deleteUser);

// /для додавання в улюблені: шлях "users/id/favoriteRest?restId=...."
userRouter.post(
    '/:userId/favoriteRest',
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserIsExist(),
    userController.addFavoriteRest);

userRouter.delete(
    '/:userId/favoriteRest',
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserIsExist(),
    userController.removeFavoriteRest);


module.exports = userRouter
