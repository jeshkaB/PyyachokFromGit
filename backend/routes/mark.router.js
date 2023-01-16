const {Router} = require ('express');
const {forAllMiddleware, restaurantMiddleware, authMiddleware, markMiddleware} = require("../middlewares");
const {markController, commentController} = require("../controllers");

const markRouter = Router();

markRouter.get ('/', markController.getMarks);

markRouter.post('/',
    markMiddleware.checkMarkBodyIsValid,
    forAllMiddleware.checkIdIsValid('restId','query'),//// id ресторану передаємо в query (/comments?restId=......)
    restaurantMiddleware.checkRestaurantIsExist('query'),
    authMiddleware.checkAccessToken,
    markController.createMark);

markRouter.get('/:markId',
    forAllMiddleware.checkIdIsValid('markId'),
    markMiddleware.checkMarkIsExist(), //виходить, що ми два рази робимо запит до Бд, в мідлварі і контролері - ??????
    markController.getMarkById);

markRouter.patch('/:markId',
    markMiddleware.checkMarkBodyIsValid,
    forAllMiddleware.checkIdIsValid('markId'),
    markMiddleware.checkMarkIsExist(),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkUserIdInEntity('mark'),
    markController.updateMark);

markRouter.delete('/:markId',
    forAllMiddleware.checkIdIsValid('markId'),
    markMiddleware.checkMarkIsExist(),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkUserIdInEntity('mark'),
    markController.deleteMark);

module.exports = markRouter
