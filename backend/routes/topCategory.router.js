const {Router} = require('express');
const {topCategoryController} = require("../controllers");
const {topCategoryMiddleware, forAllMiddleware, authMiddleware} = require("../middlewares");
const {roles} = require("../constants");

const topCategoryRouter = Router();

topCategoryRouter.get('/',topCategoryController.getTopCategories);

topCategoryRouter.post('/',
    topCategoryMiddleware.checkTopCategoryBodyIsValid,
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkRole(roles.SUPER_ADMIN),
    topCategoryController.createTopCategory);

topCategoryRouter.get('/:categId',
    forAllMiddleware.checkIdIsValid('categId'),
    topCategoryMiddleware.checkTopCategoryIsExist(),
    topCategoryController.getTopCategoryById);

topCategoryRouter.patch('/:categId',
    topCategoryMiddleware.checkTopCategoryBodyIsValid,
    forAllMiddleware.checkIdIsValid('categId'),
    topCategoryMiddleware.checkTopCategoryIsExist(),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkUserIdInEntity('topCategory'),
    topCategoryController.updateTopCategory);

topCategoryRouter.delete('/:categId',
    forAllMiddleware.checkIdIsValid('categId'),
    topCategoryMiddleware.checkTopCategoryIsExist(),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkUserIdInEntity('topCategory'),
    topCategoryController.deleteTopCategory);

module.exports = topCategoryRouter
