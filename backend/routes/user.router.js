const {Router} = require('express');
const {userController} = require("../controllers");
const {forAllMiddleware, userMiddleware} = require("../middlewares");

const userRouter = Router();

userRouter.get(
    '/',
    userController.getUsers);

userRouter.post(
    '/',
    userMiddleware.checkUserBodyIsValid,
    userMiddleware.checkEmailIsUnique,
    userController.createUser);

userRouter.get(
    '/:userId',
    forAllMiddleware.checkIdIsValid('userId'),
    userController.getUserById);

userRouter.patch(
    '/:userId',
    forAllMiddleware.checkIdIsValid('userId'),
    userController.updateUser);

userRouter.delete(
    '/:userId',
    forAllMiddleware.checkIdIsValid('userId'),
    userController.deleteUser);


module.exports = userRouter
