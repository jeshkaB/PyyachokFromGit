const {Router} = require ('express');

const {newsController} = require('../controllers');
const {authMiddleware, restaurantMiddleware, forAllMiddleware, newsMiddleware} = require('../middlewares');
const {tokenTypes} = require('../constants');

const newsRouter = Router();

newsRouter.get('/', newsController.getNews);

newsRouter.post('/',
  newsMiddleware.checkNewNewsBodyIsValid,
  forAllMiddleware.checkIdIsValid('restId','query'),
  restaurantMiddleware.checkRestaurantIsExist('query'),
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  forAllMiddleware.checkUserIdInEntity('restaurant'),
  newsController.createNews);

newsRouter.get('/:newsId',
  forAllMiddleware.checkIdIsValid('newsId'),
  newsMiddleware.checkNewsIsExist(),
  newsController.getNewsById,);

newsRouter.patch('/:newsId',
  newsMiddleware.checkUpdateNewsBodyIsValid,
  forAllMiddleware.checkIdIsValid('newsId'),
  newsMiddleware.checkNewsIsExist(),
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  forAllMiddleware.checkUserIdInEntity('news'),
  newsController.updateNews);

newsRouter.delete('/:newsId',
  forAllMiddleware.checkIdIsValid('newsId'),
  newsMiddleware.checkNewsIsExist(),
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  forAllMiddleware.checkUserIdInEntity('news'),
  newsController.deleteNews);

module.exports = newsRouter;
