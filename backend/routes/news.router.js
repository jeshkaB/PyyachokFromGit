const {Router} = require ('express');
const upload = require('multer')();
const {newsController} = require("../controllers");
const {authMiddleware, restaurantMiddleware, forAllMiddleware, newsMiddleware} = require("../middlewares");

const newsRouter = Router();

newsRouter.get('/', newsController.getNews);

newsRouter.post('/',
    // upload.any(),
    newsMiddleware.checkNewNewsBodyIsValid,
    forAllMiddleware.checkIdIsValid('restId','query'),//// id ресторану передаємо в query (/comments?restId=......)
    restaurantMiddleware.checkRestaurantIsExist('query'),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkUserIdInEntity('restaurant'),
    newsController.createNews);

newsRouter.get('/:newsId',
    forAllMiddleware.checkIdIsValid('newsId'),
    newsMiddleware.checkNewsIsExist(),
    newsController.getNewsById,);

newsRouter.patch('/:newsId',
    // upload.any(),
    newsMiddleware.checkUpdateNewsBodyIsValid,
    forAllMiddleware.checkIdIsValid('newsId'),
    newsMiddleware.checkNewsIsExist(),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkUserIdInEntity('news'),
    newsController.updateNews);

newsRouter.delete('/:newsId',
    forAllMiddleware.checkIdIsValid('newsId'),
    newsMiddleware.checkNewsIsExist(),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkUserIdInEntity('news'),
    newsController.deleteNews);

module.exports = newsRouter
