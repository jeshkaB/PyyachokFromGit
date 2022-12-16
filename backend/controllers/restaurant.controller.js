const {restaurantService} = require("../services");
const {statusCode} = require("../constants");

module.exports = {
    createRestaurant: async (req, res, next) => {
        try {
            const restaurant = await restaurantService.createRestaurant(req.body);
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
    getRestaurantById: async (req,res,next) => {
        try {
            const {restId} = req.params;
            const restaurant = await restaurantService.getRestaurantById(restId);
            res.json(restaurant)
        } catch (e) {
            next(e)
        }
    },
    updateRestaurant: async (req,res,next) => {
        try {
           const {restId} = req.params;
           const restaurant = await restaurantService.updateRestaurant(restId, req.body);
           res.json(restaurant)

        }catch (e) {
            next(e)
        }
    },
    deleteRestaurant: async (req,res,next) => {
        try {
            const {restId} = req.params;
            await restaurantService.deleteRestaurant(restId);
            res.status(statusCode.NO_CONTENT)

        }catch (e) {
            next(e)
        }
    }
}

