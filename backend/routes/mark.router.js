const {Router} = require ('express');

const {forAllMiddleware, restaurantMiddleware, authMiddleware, markMiddleware} = require("../middlewares");
const {markController} = require("../controllers");
const {tokenTypes} = require("../constants");

const markRouter = Router();

markRouter.get ('/', markController.getMarks);

markRouter.post('/',
    markMiddleware.checkMarkBodyIsValid,
    forAllMiddleware.checkIdIsValid('restId','query'),
    restaurantMiddleware.checkRestaurantIsExist('query'),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    markController.createMark);

markRouter.get('/:markId',
    forAllMiddleware.checkIdIsValid('markId'),
    markMiddleware.checkMarkIsExist(),
    markController.getMarkById);

markRouter.patch('/:markId',
    markMiddleware.checkMarkBodyIsValid,
    forAllMiddleware.checkIdIsValid('markId'),
    markMiddleware.checkMarkIsExist(),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    forAllMiddleware.checkUserIdInEntity('mark'),
    markController.updateMark);

markRouter.delete('/:markId',
    forAllMiddleware.checkIdIsValid('markId'),
    markMiddleware.checkMarkIsExist(),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    forAllMiddleware.checkUserIdInEntity('mark'),
    markController.deleteMark);

module.exports = markRouter
