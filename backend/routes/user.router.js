const {Router} = require('express');
const {userController} = require("../controllers");
const {forAllMiddleware, userMiddleware, authMiddleware} = require("../middlewares");
const {roles} = require("../constants");

const userRouter = Router();

userRouter.get(
    '/',
    userController.getUsers);

userRouter.post(
    '/',
    userMiddleware.checkNewUserBodyIsValid,
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkRole(roles.SUPER_ADMIN),
    userMiddleware.checkEmailIsUnique,
    userController.createUser);

userRouter.get(
    '/:userId',
    forAllMiddleware.checkIdIsValid('userId'),
    userMiddleware.checkUserIsExist(),
    userController.getUserById);

userRouter.patch(
    '/:userId',
    forAllMiddleware.checkIdIsValid('userId'),
    userMiddleware.checkUpdateUserBodyIsValid,
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkIdAreSame ('userId'),
    userMiddleware.checkUserIsExist(),
    userController.updateUser);

userRouter.delete(
    '/:userId',
    forAllMiddleware.checkIdIsValid('userId'),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkIdAreSame ('userId'),
    userMiddleware.checkUserIsExist(),
    userController.deleteUser);


module.exports = userRouter
