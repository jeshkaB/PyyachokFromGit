const {Router} = require("express");
const upload = require('multer')();

const {restaurantController} = require("../controllers");
const {restaurantMiddleware, forAllMiddleware, userMiddleware, authMiddleware} = require("../middlewares");
const {roles} = require("../constants");

const restaurantRouter = Router();

restaurantRouter.get(
    '/',
    restaurantController.getRestaurants);

restaurantRouter.post(
    '/',
    // upload.any(),
    restaurantMiddleware.checkNewRestaurantBodyIsValid,
    authMiddleware.checkAccessToken,
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
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkUserIdInEntity('restaurant'),    //перевірка доступу - 1) якщо айди юзера в токенинфо співпадає з айди юзера в ресторані або юзер - суперадмін
    restaurantController.updateRestaurant);

restaurantRouter.delete(
    '/:restId',
    forAllMiddleware.checkIdIsValid('restId'),
    restaurantMiddleware.checkRestaurantIsExist(),
    forAllMiddleware.checkUserIdInEntity('restaurant'),
    restaurantController.deleteRestaurant);

module.exports = restaurantRouter

