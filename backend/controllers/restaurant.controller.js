const path = require('path');
const uuid = require('uuid');

const {
  restaurantService, fileService, userService, commentService, newsService, userEventService, markService,
  nodemailerService, viewStatisticsService
} = require('../services');
const {statusCode, pathImg, roles} = require('../constants');
const {PATH_RESTAURANT_PHOTO} = require('../constants/pathImg');
const {PAGE_LIMIT_REST} = require('../constants/pageLimit');

module.exports = {
  createRestaurant: async (req, res, next) => {
    try {
      const {_id, role} = req.tokenInfo.user;
      const restaurants = await restaurantService.getRestaurantByParams({user: _id});
      const fileName = uuid.v4() + '.jpg';
      const {mainImage} = req.files;
      await mainImage.mv(path.resolve(__dirname, '..', PATH_RESTAURANT_PHOTO, fileName));
      const restaurant = await restaurantService.createRestaurant({
        ...req.body,
        user: _id,
        mainImage: fileName,
        rating: 0
      });
      if (role.includes(roles.REST_ADMIN)) {await userService.updateUser(_id, {
        restaurants: [
          ...restaurants,
          restaurant
        ]
      });}
      res.status(statusCode.CREATE).json(restaurant);

    } catch (e) {
      next(e);
    }
  },
  getRestaurants: async (req, res, next) => {
    try {
      const restaurants = await restaurantService.getRestaurants();

      res.json(restaurants);

    } catch (e) {
      next(e);
    }
  },
  getRestaurantsByParams: async (req, res, next) => {
    try {
      const queryParams = req.query;
      const page = queryParams.page ? queryParams.page : 1;
      const moderated = queryParams.moderated;
      const sort = queryParams.sort ? JSON.parse(`{"${queryParams.sort}" : "${queryParams.sortOrder}"}`) : '';
      const {longitude,latitude} = queryParams;
      const ratingMin = queryParams.rating ? +queryParams.rating.split('-')[0] : 0;
      const ratingMax = queryParams.rating ? +queryParams.rating.split('-')[1] : 5;

      const averageBillMin = queryParams.averageBill ? +queryParams.averageBill.split('-')[0] : 0;
      const averageBillMax = queryParams.averageBill ? +queryParams.averageBill.split('-')[1] : 100000;

      const tagsValue = queryParams.tags ? queryParams.tags : '.*';
      const searchByName = queryParams.search ? queryParams.search : '.*'; //пошук тільки по полю 'name'
      const filter = {ratingMin, ratingMax,averageBillMin,averageBillMax,tagsValue};

      const totalItemsByParams = await restaurantService.getCountRestaurantsByParams(filter,searchByName);
      // eslint-disable-next-line max-len
      const restaurants = await restaurantService.getRestaurantsListByParams(filter,searchByName,moderated,sort,longitude,latitude,page);

      res.json({totalItems:totalItemsByParams, page, limit: PAGE_LIMIT_REST, restaurants});

    } catch (e) {
      next(e);
    }
  },

  getRestaurantById: async (req, res, next) => {
    try {
      const {restId} = req.params;
      const restaurant = await restaurantService.getRestaurantById(restId);
      // const mainImageBuffer = await fileService.readFile(pathImg.PATH_RESTAURANT_PHOTO, restaurant.mainImage);
      // res.json({...restaurant, mainImageBuffer})
      res.json(restaurant);
    } catch (e) {
      next(e);
    }
  },
  updateRestaurant: async (req, res, next) => {
    try {
      const {restId} = req.params;
      const restaurant = await restaurantService.updateRestaurant(restId, req.body);
      res.json(restaurant);

      if (req.files) {
        // eslint-disable-next-line no-use-before-define
        const fileName = restaurant.mainImage;
        const {mainImage} = req.files;
        await mainImage.mv(path.resolve(__dirname, '..', PATH_RESTAURANT_PHOTO, fileName));
        const restaurant = await restaurantService.getRestaurantById(restId);
        res.json(restaurant);
      }

    } catch (e) {
      next(e);
    }
  },
  deleteRestaurant: async (req, res, next) => {
    try {
      const {restId} = req.params;
      const {
        user,
        moderated,
        mainImage,
        news,
        comments,
        userEvents,
        marks
      } = await restaurantService.getRestaurantById(restId);//тут всі айдішки

      //видаляємо всі сутності, похідні від ресторану, якщо це не видалення закладу, який не пройшов модерацію
      if (moderated) {
        // news.map(async id => await newsService.deleteNews(id));
        // comments.map(async id => await commentService.deleteComment(id));
        // userEvents.map(async id => await userEventService.deleteUserEvent(id));
        // marks.map(async id => await markService.deleteMark(id));
        news.map(id => newsService.deleteNews(id));
        comments.map(id => commentService.deleteComment(id));
        userEvents.map(id => userEventService.deleteUserEvent(id));
        marks.map(id => markService.deleteMark(id));
      }

      await fileService.deleteFile(pathImg.PATH_RESTAURANT_PHOTO, mainImage);

      //видаляємо ресторан з юзера
      const restaurantsOfUser = await restaurantService.getRestaurantByParams({user});
      const index = restaurantsOfUser.findIndex(rest => rest._id === restId);
      const newRestaurantsList = restaurantsOfUser.splice(index, 1);
      await userService.updateUser(user, {restaurants: newRestaurantsList});

      await restaurantService.deleteRestaurant(restId);

      res.status(statusCode.NO_CONTENT).json();

    } catch (e) {
      next(e);
    }
  },
  sendMessage: async (req, res, next) => {
    try {
      const {restId} = req.params;
      const {userId} = req.query;
      const {text} = req.body;

      const {email: restEmail} = await restaurantService.getRestaurantById(restId);
      const {email: userEmail, name} = await userService.getUserById(userId);
      await nodemailerService.sendEmail(
        restEmail, 
        'Повідомлення з Пиячка', 
        `${text}. Від користувача ${name}. Email ${userEmail}`);

      res.json();

    } catch (e) {
      next(e);
    }
  },
  changeRestAdmin: async (req, res, next) => {
    try {
      const {restId} = req.params;
      const {userId} = req.query;

      const {role, restaurants} = req.user;


      const restaurant = await restaurantService.updateRestaurant(restId, {user: userId});

      if (role.includes(roles.REST_ADMIN)) {

        await userService.updateUser(userId, {
          restaurants: [
            ...restaurants,
            restId
          ]
        });
      } else {

        await userService.updateUser(userId, {
          restaurants: [
            ...restaurants,
            restId
          ],
          role: [
            ...role,
            roles.REST_ADMIN
          ]
        });
      }
      res.json(restaurant);


    } catch (e) {
      next(e);
    }
  },

  completeViews: async (req, res, next) => {
    try {
      const limitTimeOneView = 24 * 60 * 60 * 1000; //24 hours

      const {user: {_id, role}} = req.tokenInfo;
      const {_id: restId} = req.restaurant;

      const currentDate = new Date();
      const prevViews = await viewStatisticsService.getViewStatisticsByParams({user: _id, restaurant:restId});

      if (role.includes(roles.REST_ADMIN) || role.includes(roles.SUPER_ADMIN))
      {return res.json('not accepted role');}

      if (prevViews.find(view => currentDate - view.createdAt < limitTimeOneView))
      {res.json('re-viewing');}
      else {
        await viewStatisticsService.createViewStatistics({user:_id, restaurant:restId});
      }
      res.json('accept');

    } catch (e) {
      next(e);
    }
  }
};

