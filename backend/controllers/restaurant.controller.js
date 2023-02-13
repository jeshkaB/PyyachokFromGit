const {restaurantService, fileService, userService, commentService} = require("../services");
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
            const restaurant = await restaurantService.createRestaurant({...req.body, user: _id, mainImage: fileName});
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
            const {restId} = req.params;
            const restaurant = await restaurantService.updateRestaurant(restId, req.body);

            res.json(restaurant);

            if (req.files) {
                const fileName = restaurant.mainImage;
                const {mainImage} = req.files;
                await mainImage.mv(path.resolve(__dirname, '..', PATH_RESTAURANT_PHOTO, fileName));
            }

        } catch (e) {
            next(e)
        }
    },
    deleteRestaurant: async (req, res, next) => {
        try {
            const {restId} = req.params;

            const {mainImage} = restaurantService.getRestaurantById(restId);
            await fileService.deleteFile(pathImg.PATH_RESTAURANT_PHOTO, mainImage);

            await restaurantService.deleteRestaurant(restId);
            res.status(statusCode.NO_CONTENT).json()

        } catch (e) {
            next(e)
        }
    }
}

