const {Router} = require('express');

const {forAllMiddleware, authMiddleware, restaurantMiddleware, userEventMiddleware} = require("../middlewares");
const {userEventController} = require("../controllers");

const userEventRouter = Router();

userEventRouter.get('/',userEventController.getUserEvents);

userEventRouter.post('/',
    userEventMiddleware.checkNewUserEventBodyIsValid,
    forAllMiddleware.checkIdIsValid('restId','query'),//// id ресторану передаємо в query (/comments?restId=......)
    restaurantMiddleware.checkRestaurantIsExist('query'),
    authMiddleware.checkAccessToken,
    userEventController.createUserEvent);

userEventRouter.get('/:eventId',
    forAllMiddleware.checkIdIsValid('eventId'),
    userEventMiddleware.checkUserEventIsExist(),
    userEventController.getUserEventById);

userEventRouter.patch('/:eventId',
    userEventMiddleware.checkUpdateUserEventBodyIsValid,
    forAllMiddleware.checkIdIsValid('eventId'),
    userEventMiddleware.checkUserEventIsExist(),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkUserIdInEntity('userEvent'),
    userEventController.updateUserEvent);

userEventRouter.delete('/:eventId',
    forAllMiddleware.checkIdIsValid('eventId'),
    userEventMiddleware.checkUserEventIsExist(),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkUserIdInEntity('userEvent'),
    userEventController.deleteUserEvent);

module.exports = userEventRouter
