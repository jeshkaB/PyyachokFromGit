const {Router} = require('express');

const {commentController} = require("../controllers");
const {commentMiddleware, forAllMiddleware, authMiddleware, restaurantMiddleware} = require("../middlewares");
const {tokenTypes} = require("../constants");

const commentRouter = Router();

commentRouter.get('/',commentController.getComments);

commentRouter.post('/',
    commentMiddleware.checkCommentBodyIsValid,
    forAllMiddleware.checkIdIsValid('restId','query'),//// id ресторану передаємо в query (/comments?restId=......)
    restaurantMiddleware.checkRestaurantIsExist('query'),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    commentController.createComment);

commentRouter.get('/:comId',
    forAllMiddleware.checkIdIsValid('comId'),
    commentMiddleware.checkCommentIsExist(),
    commentController.getCommentById,);

commentRouter.patch('/:comId',
    commentMiddleware.checkCommentBodyIsValid,
    forAllMiddleware.checkIdIsValid('comId'),
    commentMiddleware.checkCommentIsExist(),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    forAllMiddleware.checkUserIdInEntity('comment'),
    commentController.updateComment);

commentRouter.delete('/:comId',
    forAllMiddleware.checkIdIsValid('comId'),
    commentMiddleware.checkCommentIsExist(),
    authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
    forAllMiddleware.checkUserIdInEntity('comment'),
    commentController.deleteComment);

module.exports = commentRouter
