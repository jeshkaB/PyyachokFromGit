const {Router} = require('express');

const {topCategoryController} = require('../controllers');
const {topCategoryMiddleware, forAllMiddleware, authMiddleware, restaurantMiddleware} = require('../middlewares');
const {roles, tokenTypes} = require('../constants');

const topCategoryRouter = Router();

topCategoryRouter.get('/',topCategoryController.getTopCategories);

topCategoryRouter.post('/',
  topCategoryMiddleware.checkTopCategoryBodyIsValid,
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  forAllMiddleware.checkRole(roles.SUPER_ADMIN),
  topCategoryController.createTopCategory);

topCategoryRouter.get('/:categId',
  forAllMiddleware.checkIdIsValid('categId'),
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  forAllMiddleware.checkRole(roles.SUPER_ADMIN),
  topCategoryMiddleware.checkTopCategoryIsExist(),
  topCategoryController.getTopCategoryById);

topCategoryRouter.patch('/:categId',
  topCategoryMiddleware.checkTopCategoryBodyIsValid,
  forAllMiddleware.checkIdIsValid('categId'),
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  forAllMiddleware.checkRole(roles.SUPER_ADMIN),
  topCategoryMiddleware.checkTopCategoryIsExist(),
  topCategoryController.updateTopCategory);

topCategoryRouter.delete('/:categId',
  forAllMiddleware.checkIdIsValid('categId'),
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  forAllMiddleware.checkRole(roles.SUPER_ADMIN),
  topCategoryMiddleware.checkTopCategoryIsExist(),
  topCategoryController.deleteTopCategory);

topCategoryRouter.post('/:categId/Restaurant',
  forAllMiddleware.checkIdIsValid('categId'),
  forAllMiddleware.checkIdIsValid('restId','query'),
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  forAllMiddleware.checkRole(roles.SUPER_ADMIN),
  topCategoryMiddleware.checkTopCategoryIsExist(),
  restaurantMiddleware.checkRestaurantIsExist('query'),
  topCategoryController.addRestaurantInCategory);

topCategoryRouter.delete('/:categId/Restaurant',
  forAllMiddleware.checkIdIsValid('categId'),
  forAllMiddleware.checkIdIsValid('restId','query'),
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  forAllMiddleware.checkRole(roles.SUPER_ADMIN),
  topCategoryMiddleware.checkTopCategoryIsExist(),
  restaurantMiddleware.checkRestaurantIsExist('query'),
  topCategoryController.removeRestaurantInCategory);

module.exports = topCategoryRouter;
