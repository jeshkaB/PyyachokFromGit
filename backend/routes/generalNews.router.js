const {Router} = require ('express');
const {newsController, generalNewsController} = require("../controllers");
const {authMiddleware, forAllMiddleware, generalNewsMiddleware} = require("../middlewares");
const {roles} = require("../constants");

const generalNewsRouter = Router();

generalNewsRouter.get('/', generalNewsController.getNews);

generalNewsRouter.post('/',
    generalNewsMiddleware.checkNewNewsBodyIsValid,
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkRole(roles.SUPER_ADMIN),
    generalNewsController.createNews);

generalNewsRouter.get('/:newsId',
    forAllMiddleware.checkIdIsValid('newsId'),
    generalNewsMiddleware.checkNewsIsExist(),
    generalNewsController.getNewsById,);

generalNewsRouter.patch('/:newsId',
    generalNewsMiddleware.checkUpdateNewsBodyIsValid,
    forAllMiddleware.checkIdIsValid('newsId'),
    generalNewsMiddleware.checkNewsIsExist(),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkUserIdInEntity('generalNews'),
    generalNewsController.updateNews);

generalNewsRouter.delete('/:newsId',
    forAllMiddleware.checkIdIsValid('newsId'),
    generalNewsMiddleware.checkNewsIsExist(),
    authMiddleware.checkAccessToken,
    forAllMiddleware.checkUserIdInEntity('generalNews'),
    generalNewsController.deleteNews);

module.exports = generalNewsRouter
