const {Router} = require('express');

const {forAllMiddleware, authMiddleware, restaurantMiddleware, userEventMiddleware} = require("../middlewares");
const {userEventController} = require("../controllers");
const {tokenTypes} = require("../constants");

const userEventRouter = Router();

userEventRouter.get('/',userEventController.getUserEvents);

userEventRouter.post('/',
    userEventMiddleware.checkNewUserEventBodyIsValid,
    forAllMiddleware.checkIdIsValid('restId','query'),
    restaurantMiddleware.checkRestaurantIsExist('query'),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    userEventController.createUserEvent);

userEventRouter.get('/:eventId',
    forAllMiddleware.checkIdIsValid('eventId'),
    userEventMiddleware.checkUserEventIsExist(),
    userEventController.getUserEventById);

userEventRouter.patch('/:eventId',
    userEventMiddleware.checkUpdateUserEventBodyIsValid,
    forAllMiddleware.checkIdIsValid('eventId'),
    userEventMiddleware.checkUserEventIsExist(),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    forAllMiddleware.checkUserIdInEntity('userEvent'),
    userEventController.updateUserEvent);

userEventRouter.delete('/:eventId',
    forAllMiddleware.checkIdIsValid('eventId'),
    userEventMiddleware.checkUserEventIsExist(),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    forAllMiddleware.checkUserIdInEntity('userEvent'),
    userEventController.deleteUserEvent);

module.exports = userEventRouter
