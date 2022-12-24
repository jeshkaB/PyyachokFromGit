const {Router} = require('express');
const {commentController} = require("../controllers");
const {commentMiddleware, forAllMiddleware, authMiddleware, restaurantMiddleware} = require("../middlewares");

const commentRouter = Router();

commentRouter.get('/',
    commentController.getComments);

commentRouter.post('/',
    commentMiddleware.checkNewCommentBodyIsValid,
    forAllMiddleware.checkIdIsValid('restId','query'),//// id ресторану передаємо в query (/comments?restId=......)
    restaurantMiddleware.checkRestaurantIsExist('query'),
    authMiddleware.checkAccessToken,
    commentController.createComment);

commentRouter.get('/:comId', commentController.getCommentById);

commentRouter.patch('/:comId', commentController.updateComment);

commentRouter.delete('/:comId', commentController.deleteComment);

module.exports = commentRouter
