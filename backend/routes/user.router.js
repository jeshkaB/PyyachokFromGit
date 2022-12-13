const {Router} = require('express');
const {userController} = require("../controllers");
const {forAllMiddleware} = require("../middlewares");

const userRouter = Router();

userRouter.get(
    '/',
    userController.getUsers);

userRouter.post(
    '/',
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
