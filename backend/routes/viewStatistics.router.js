const {Router} = require('express');

const {viewStatisticsController} = require('../controllers');
const {forAllMiddleware, authMiddleware, restaurantMiddleware} = require('../middlewares');
const {tokenTypes, roles} = require('../constants');

const viewStatisticsRouter = Router();

viewStatisticsRouter.get('/',
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  forAllMiddleware.checkRole(roles.SUPER_ADMIN),
  viewStatisticsController.getViewStatistics);

viewStatisticsRouter.get('/:restId',
  forAllMiddleware.checkIdIsValid('restId'),
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  restaurantMiddleware.checkRestaurantIsExist(),
  forAllMiddleware.checkUserIdInEntity('restaurant'),
  viewStatisticsController.getViewStatisticsByRestId);

module.exports = viewStatisticsRouter;
