const {Router} = require("express");

const {restaurantController} = require("../controllers");
const {restaurantMiddleware, forAllMiddleware} = require("../middlewares");

const restaurantRouter = Router();

restaurantRouter.get(
    '/',
    restaurantController.getRestaurants);

restaurantRouter.post(
    '/',
    restaurantMiddleware.checkNewRestaurantBodyIsValid,
    restaurantMiddleware.checkEmailIsUnique,    // ??? у різних ресторанів теоретично може бути один емейл
    restaurantController.createRestaurant);

restaurantRouter.get(
    '/:restId',
    forAllMiddleware.checkIdIsValid('restId'),
    restaurantMiddleware.checkRestaurantIsExist,
    restaurantController.getRestaurantById);

restaurantRouter.patch(
    '/:restId',
    forAllMiddleware.checkIdIsValid('restId'),
    restaurantMiddleware.checkRestaurantIsExist,
    restaurantMiddleware.checkUpdateRestaurantBodyIsValid,
    restaurantController.updateRestaurant);

restaurantRouter.delete(
    '/:restId',
    forAllMiddleware.checkIdIsValid('restId'),
    restaurantMiddleware.checkRestaurantIsExist,
    restaurantController.deleteRestaurant);

module.exports = restaurantRouter

