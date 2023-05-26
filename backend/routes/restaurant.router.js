const {Router} = require('express');

const {restaurantController} = require('../controllers');
const {restaurantMiddleware, forAllMiddleware, authMiddleware, userMiddleware} = require('../middlewares');
const {roles, tokenTypes} = require('../constants');

const restaurantRouter = Router();

restaurantRouter.get(
  '/',
  restaurantController.getRestaurants);

restaurantRouter.get(
  '/advancedSearch',
  restaurantController.getRestaurantsByParams);

restaurantRouter.post(
  '/',
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
  forAllMiddleware.checkIdIsValid('restId'),
  restaurantMiddleware.checkUpdateRestaurantBodyIsValid,
  restaurantMiddleware.checkRestaurantIsExist(),
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  forAllMiddleware.checkUserIdInEntity('restaurant'),
  restaurantController.updateRestaurant);

restaurantRouter.delete(
  '/:restId',
  forAllMiddleware.checkIdIsValid('restId'),
  restaurantMiddleware.checkRestaurantIsExist(),
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  forAllMiddleware.checkUserIdInEntity('restaurant'),
  restaurantController.deleteRestaurant);

restaurantRouter.post(
  '/:restId/message',
  forAllMiddleware.checkIdIsValid('restId'),
  restaurantMiddleware.checkRestaurantIsExist(),
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  restaurantController.sendMessage);

restaurantRouter.put(
  '/:restId/changeAdmin',
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
module.exports = restaurantRouter;

