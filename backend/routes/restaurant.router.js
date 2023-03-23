const {Router, query} = require("express");
const upload = require('multer')();

const {restaurantController} = require("../controllers");
const {restaurantMiddleware, forAllMiddleware, authMiddleware, userMiddleware} = require("../middlewares");
const {roles, tokenTypes} = require("../constants");

const restaurantRouter = Router();

restaurantRouter.get(
    '/',
    restaurantController.getRestaurants);

restaurantRouter.post(
    '/',
    // upload.any(),
    restaurantMiddleware.checkNewRestaurantBodyIsValid,
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    forAllMiddleware.checkRole(roles.REST_ADMIN),
    restaurantMiddleware.checkEmailIsUnique,
    restaurantController.createRestaurant);

restaurantRouter.get(
    '/:restId',
    forAllMiddleware.checkIdIsValid('restId'),
    restaurantMiddleware.checkRestaurantIsExist(),
    restaurantController.getRestaurantById);

restaurantRouter.patch(
    '/:restId',
    // upload.any(),
    forAllMiddleware.checkIdIsValid('restId'),
    restaurantMiddleware.checkUpdateRestaurantBodyIsValid,
    restaurantMiddleware.checkRestaurantIsExist(),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    forAllMiddleware.checkUserIdInEntity('restaurant'),    //перевірка доступу - 1) якщо айди юзера в токенинфо співпадає з айди юзера в ресторані або юзер - суперадмін
    restaurantController.updateRestaurant);

restaurantRouter.delete(
    '/:restId',
    forAllMiddleware.checkIdIsValid('restId'),
    restaurantMiddleware.checkRestaurantIsExist(),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    forAllMiddleware.checkUserIdInEntity('restaurant'),
    restaurantController.deleteRestaurant);

restaurantRouter.post(
    '/:restId/message', //+?userId=....
    forAllMiddleware.checkIdIsValid('restId'),
    restaurantMiddleware.checkRestaurantIsExist(),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    restaurantController.sendMessage);

restaurantRouter.put(
    '/:restId/changeAdmin', //userId in query
    forAllMiddleware.checkIdIsValid('restId'),
    forAllMiddleware.checkIdIsValid('userId', 'query'),
    restaurantMiddleware.checkRestaurantIsExist(),
    userMiddleware.checkUserIsExist('query'),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    forAllMiddleware.checkRole(roles.SUPER_ADMIN),
    restaurantController.changeRestAdmin);

restaurantRouter.put(
    '/:restId/view',
    forAllMiddleware.checkIdIsValid('restId'),
    restaurantMiddleware.checkRestaurantIsExist(),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    restaurantController.completeViews);
module.exports = restaurantRouter

