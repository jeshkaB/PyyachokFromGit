const {Router} = require("express");

const {restaurantController} = require("../controllers");

const restaurantRouter = Router();

restaurantRouter.get(
    '/',
    restaurantController.getRestaurants);

restaurantRouter.post(
    '/',
    restaurantController.createRestaurant);

restaurantRouter.get(
    '/:restId',
    restaurantController.getRestaurantById);

restaurantRouter.patch(
    '/:restId',
    restaurantController.updateRestaurant);

restaurantRouter.delete(
    '/:restId',
    restaurantController.deleteRestaurant);

module.exports = restaurantRouter

