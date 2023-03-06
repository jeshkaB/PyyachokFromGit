const {restaurantService, fileService, userService, commentService, newsService, userEventService, markService,
    nodemailerService
} = require("../services");
const {statusCode, pathImg, roles} = require("../constants");
const uuid = require("uuid");
const {PATH_RESTAURANT_PHOTO} = require("../constants/pathImg");
const path = require("path");


module.exports = {
    createRestaurant: async (req, res, next) => {
        try {
            const {_id, role} = req.tokenInfo.user;
            const restaurants = await restaurantService.getRestaurantByParams({user: _id});

            const fileName = uuid.v4() + '.jpg';
            const {mainImage} = req.files;
            await mainImage.mv(path.resolve(__dirname, '..', PATH_RESTAURANT_PHOTO, fileName));
            const restaurant = await restaurantService.createRestaurant({...req.body, user: _id, mainImage: fileName, rating:0});
            if (role.includes(roles.REST_ADMIN)) await userService.updateUser(_id, {
                restaurants: [
                    ...restaurants,
                    restaurant
                ]
            })
            res.status(statusCode.CREATE).json(restaurant)

        } catch (e) {
            next(e)
        }
    },
    getRestaurants: async (req, res, next) => {
        try {
            const restaurants = await restaurantService.getRestaurants();

            res.json(restaurants)

        } catch (e) {
            next(e)
        }
    },
    getRestaurantById: async (req, res, next) => {
        try {
            const {restId} = req.params;
            const restaurant = await restaurantService.getRestaurantById(restId);
            // const mainImageBuffer = await fileService.readFile(pathImg.PATH_RESTAURANT_PHOTO, restaurant.mainImage);
            // res.json({...restaurant, mainImageBuffer})
            res.json(restaurant)
        } catch (e) {
            next(e)
        }
    },
    updateRestaurant: async (req, res, next) => {
        try {
            console.log(req.body)
            const {restId} = req.params;
            const restaurant = await restaurantService.updateRestaurant(restId, req.body);
            res.json(restaurant);

            if (req.files) {
                const fileName = restaurant.mainImage;
                const {mainImage} = req.files;
                await mainImage.mv(path.resolve(__dirname, '..', PATH_RESTAURANT_PHOTO, fileName));
                const restaurant = await restaurantService.getRestaurantById(restId)
                res.json(restaurant)
            }

        } catch (e) {
            next(e)
        }
    },
    deleteRestaurant: async (req, res, next) => {
        try {
            const {restId} = req.params;
            // const {_id} = req.tokenInfo.user;
            const {user, moderated, mainImage, news, comments, userEvents, marks} = await restaurantService.getRestaurantById(restId);//тут всі айдішки

            //видаляємо всі сутності, похідні від ресторану, якщо це не видалення закладу, який не пройшов модерацію
            if (moderated) {
                news.map(async id => await newsService.deleteNews(id))
                comments.map(async id => await commentService.deleteComment(id))
                userEvents.map(async id => await userEventService.deleteUserEvent(id))
                marks.map(async id => await markService.deleteMark(id))
            }

            await fileService.deleteFile(pathImg.PATH_RESTAURANT_PHOTO, mainImage);

            //видаляємо ресторан з юзера
            const restaurantsOfUser = await restaurantService.getRestaurantByParams({user});
            const index = restaurantsOfUser.findIndex(rest=>rest._id===restId)
            const newRestaurantsList = restaurantsOfUser.splice(index,1)
            await userService.updateUser(user, {restaurants: newRestaurantsList})

            await restaurantService.deleteRestaurant(restId);

            res.status(statusCode.NO_CONTENT).json()

        } catch (e) {
            next(e)
        }
    },
    sendMessage: async (req, res, next) => {
        try {
            const restId = req.params;
            const userId = req.query;
            const {text} = req.body;

            const {email:restEmail} = await restaurantService.getRestaurantById(restId);
            const {email:userEmail, name} = await userService.getUserById(userId);
            await nodemailerService.sendEmail(restEmail, 'Повідомлення з Пиячка', `${text}. Від користувача ${name}. Email ${userEmail}`)
            res.json()

        } catch (e) {
            next(e)
        }
    }
}

