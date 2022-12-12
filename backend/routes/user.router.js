const {Router} = require('express');
const {userController} = require("../controllers");

const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.post('/', userController.createUser);
userRouter.get('/:userId', userController.getUserById);
userRouter.patch('/:userId', userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);


module.exports = userRouter
