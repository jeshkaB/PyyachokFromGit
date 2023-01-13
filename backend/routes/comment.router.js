const {Router} = require('express');
const {commentController} = require("../controllers");
const {commentMiddleware, forAllMiddleware, authMiddleware, restaurantMiddleware} = require("../middlewares");

const commentRouter = Router();

commentRouter.get('/',commentController.getComments);

commentRouter.post('/',
    commentMiddleware.checkNewCommentBodyIsValid,
    forAllMiddleware.checkIdIsValid('restId','query'),//// id ресторану передаємо в query (/comments?restId=......)
    restaurantMiddleware.checkRestaurantIsExist('query'),
    authMiddleware.checkAccessToken,
    commentController.createComment);

commentRouter.get('/:comId',
    forAllMiddleware.checkIdIsValid('comId'),
    commentMiddleware.checkCommentIsExist(),
    commentController.getCommentById,);

commentRouter.patch('/:comId',
    commentMiddleware.checkUpdateCommentBodyIsValid,
    forAllMiddleware.checkIdIsValid('comId'),
    commentMiddleware.checkCommentIsExist(),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkUserIdInEntity('comment'),
    commentController.updateComment);

commentRouter.delete('/:comId',
    forAllMiddleware.checkIdIsValid('comId'),
    commentMiddleware.checkCommentIsExist(),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkUserIdInEntity('comment'),
    commentController.deleteComment);

module.exports = commentRouter
