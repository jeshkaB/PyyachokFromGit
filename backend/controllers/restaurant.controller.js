const {restaurantService, fileService} = require("../services");
const {statusCode, pathImg} = require("../constants");
const uuid = require("uuid");


module.exports = {
    createRestaurant: async (req, res, next) => {
        try {
            const {_id} = req.tokenInfo.user;
            const {buffer} = req.files[0];
            const fileName = uuid.v4() + '.jpg';
            await fileService.writeFile(pathImg.PATH_RESTAURANT_PHOTO, fileName, buffer)

            const restaurant = await restaurantService.createRestaurant({...req.body, user: _id, mainImage: fileName});
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
                const {buffer} = req.files[0];
                await fileService.writeFile(pathImg.PATH_RESTAURANT_PHOTO, fileName, buffer)
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

