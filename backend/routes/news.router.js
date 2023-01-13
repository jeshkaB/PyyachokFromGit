const {Router} = require ('express');
const upload = require('multer')();
const {newsController} = require("../controllers");
const {authMiddleware, restaurantMiddleware, forAllMiddleware} = require("../middlewares");
const {roles} = require("../constants");
const newsRouter = Router()

newsRouter.post('/',
    upload.any(),
    // commentMiddleware.checkNewCommentBodyIsValid,
    forAllMiddleware.checkIdIsValid('restId','query'),//// id ресторану передаємо в query (/comments?restId=......)
    restaurantMiddleware.checkRestaurantIsExist('query'),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkRole(roles.REST_ADMIN),
    newsController.createNews);

newsRouter.get('/:newsId',
    forAllMiddleware.checkIdIsValid('newsId'),
    // commentMiddleware.checkCommentIsExist(),
    newsController.getNewsById,);
//
// newsRouter.patch('/:newsId',
//     upload.any(),
//     // commentMiddleware.checkUpdateCommentBodyIsValid,
//     forAllMiddleware.checkIdIsValid('newsId'),
//     // commentMiddleware.checkCommentIsExist(),
//     authMiddleware.checkAccessToken,
//     forAllMiddleware.checkUserIdInEntity('news'),
//     newsController.updateNews);
//
// newsRouter.delete('/:newsId',
//     forAllMiddleware.checkIdIsValid('newsId'),
//     // commentMiddleware.checkCommentIsExist(),
//     authMiddleware.checkAccessToken,
//     forAllMiddleware.checkUserIdInEntity('news'),
//     newsController.deleteNews);

module.exports = newsRouter
