const {Router, query} = require("express");

const {restaurantController} = require("../controllers");
const {restaurantMiddleware, forAllMiddleware, userMiddleware, authMiddleware} = require("../middlewares");

const restaurantRouter = Router();

restaurantRouter.get(
    '/',
    restaurantController.getRestaurants);

restaurantRouter.post(
    '/',
    restaurantMiddleware.checkNewRestaurantBodyIsValid,
    authMiddleware.checkAccessToken,
    // forAllMiddleware.checkIdIsValid('userId', 'query'), // передаємо Id юзера, який створює ресторан в квері пераметрі (/restaurants?userId=......)
    // userMiddleware.checkUserIsExist('query'),
    //TODO перевірка наявності ролі 'REST_ADMIN'?
    restaurantMiddleware.checkEmailIsUnique,    // ??? у різних ресторанів теоретично може бути один емейл
    restaurantController.createRestaurant);

restaurantRouter.get(
    '/:restId',
    forAllMiddleware.checkIdIsValid('restId'),
    restaurantMiddleware.checkRestaurantIsExist,
    restaurantController.getRestaurantById);

restaurantRouter.patch(
    '/:restId',
    forAllMiddleware.checkIdIsValid('restId'),
    restaurantMiddleware.checkUpdateRestaurantBodyIsValid,
    authMiddleware.checkAccessToken,
    restaurantMiddleware.checkRestaurantIsExist,
    forAllMiddleware.checkIdAreSame('restaurant'),    //перевірка доступу - 1) якщо айди юзера в токенинфо співпадає з айди юзера в ресторані
    // TODO перевірка доступу - 2) якщо суперадмін - додати перевірку в  checkIdAreSame як умову або??????
    restaurantController.updateRestaurant);

restaurantRouter.delete(
    '/:restId',
    forAllMiddleware.checkIdIsValid('restId'),
    restaurantMiddleware.checkRestaurantIsExist,
    forAllMiddleware.checkIdAreSame('restaurant'),
    restaurantController.deleteRestaurant);

module.exports = restaurantRouter

